import { postContentToWebHook } from "@/app/(main)/(pages)/connections/_actions/discord-connections";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connections";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connection";
import { db } from "@/lib/db";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const headersList = await headers();
  let channelResourceId: string | undefined;

  headersList.forEach((value, key) => {
    if (key === "x-goog-resource-id") {
      channelResourceId = value;
    }
  });

  if (channelResourceId) {
    const user = await db.user.findFirst({
      where: {
        googleResourceId: channelResourceId,
      },
      select: {
        clerkId: true,
        credits: true,
      },
    });

    if (user && (parseInt(user.credits!) > 0 || user.credits === "Unlimited")) {
      const workflows = await db.workflows.findMany({
        where: {
          userId: user.clerkId,
        },
      });

      if (workflows.length > 0) {
        for (const flow of workflows) {
          const flowPath = JSON.parse(flow.flowPath!);
          let current = 0;

          while (current < flowPath.length) {
            if (flowPath[current] === "Discord") {
              const discordMessage = await db.discordWebhook.findFirst({
                where: { userId: flow.userId },
                select: { url: true },
              });
              if (discordMessage) {
                await postContentToWebHook(
                  flow.discordTemplate!,
                  discordMessage.url
                );
              }
              // ✅ Fixed: splice using index, not value
              flowPath.splice(current, 1);
              continue;
            }

            if (flowPath[current] === "Slack") {
              const channels = flow.slackChannels.map((channel) => ({
                label: "",
                value: channel,
              }));
              await postMessageToSlack(
                flow.slackAccessToken!,
                channels,
                flow.slackTemplate!
              );
              flowPath.splice(current, 1);
              continue;
            }

            if (flowPath[current] === "Notion") {
              // ✅ Fixed: fetch notion connection from DB using flow's userId
              const notionConnection = await db.notion.findFirst({
                where: { userId: flow.userId },
              });

              if (notionConnection) {
                await onCreateNewPageInDatabase(
                  notionConnection.databaseId,
                  notionConnection.accessToken, // ✅ real OAuth token from DB
                  JSON.parse(flow.notionTemplate!)
                );
              }
              flowPath.splice(current, 1);
              continue;
            }

            if (flowPath[current] === "Wait") {
              const res = await axios.put(
                "https://api.cron-job.org/jobs",
                {
                  job: {
                    url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                    enabled: "true",
                    schedule: {
                      timezone: "Europe/Istanbul",
                      expiresAt: 0,
                      hours: [-1],
                      mdays: [-1],
                      minutes: ["*****"],
                      months: [-1],
                      wdays: [-1],
                    },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (res) {
                flowPath.splice(current, 1);
                await db.workflows.update({
                  where: { id: flow.id },
                  data: { cronPath: JSON.stringify(flowPath) },
                });
                break;
              }
              break;
            }

            current++;
          }

          // ✅ Fixed: only deduct credits if not "Unlimited"
          if (user.credits !== "Unlimited") {
            await db.user.update({
              where: { clerkId: user.clerkId },
              data: { credits: `${parseInt(user.credits!) - 1}` },
            });
          }
        }

        return Response.json({ message: "flow completed" }, { status: 200 });
      }
    }
  }

  return Response.json({ message: "success" }, { status: 200 });
}