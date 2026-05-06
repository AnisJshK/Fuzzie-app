'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'

export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  id: string,
  guild_name: string,
  guild_id: string
) => {
  if (!webhook_id) return

  const existing = await db.discordWebhook.findFirst({
    where: {
      userId: id,
      channelId: channel_id,
    },
  })

  if (existing) {
    await db.discordWebhook.update({
      where: {
        id: existing.id,
      },
      data: {
        webhookId: webhook_id,
        url: webhook_url,
        name: webhook_name,
        guildName: guild_name,
        guildId: guild_id,
      },
    })
  } else {
    await db.discordWebhook.create({
      data: {
        userId: id,
        webhookId: webhook_id,
        channelId: channel_id,
        guildId: guild_id,
        name: webhook_name,
        url: webhook_url,
        guildName: guild_name,
        connections: {
          create: {
            userId: id,
            type: 'Discord',
          },
        },
      },
    })
  }
}

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser()
  if (user) {
    const webhook = await db.discordWebhook.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        url: true,
        name: true,
        guildName: true,
      },
    })

    return webhook
  }
}

export const postContentToWebHook = async (content: string, url: string) => {
 if (!content) return { message: 'String empty' }

  try {
    await axios.post(url, { content })
    return { message: 'success' }
  } catch (error: any) {
    console.error('Webhook error:', error?.response?.data)
    return { message: 'failed request' }
  }
}

// export const postContentToWebHook = async (content: string, url: string) => {
//   try {
//     if (!content.trim()) {
//       return { message: 'String empty' }
//     }

//     const response = await axios.post(
//       url,
//       { content },
//       {
//         timeout: 5000, // ⏱ prevent hanging
//       }
//     )

//     if (response.status >= 200 && response.status < 300) {
//       return { message: 'success' }
//     }

//     return { message: 'failed request' }
//   } catch (error: any) {
//     console.error('Webhook Error:', error.message)

//     // Optional: more detailed debugging
//     if (error.code === 'ENOTFOUND') {
//       return { message: 'DNS error (cannot reach Discord)' }
//     }

//     if (error.code === 'ECONNABORTED') {
//       return { message: 'Request timeout' }
//     }

//     return { message: 'request failed' }
//   }
// }