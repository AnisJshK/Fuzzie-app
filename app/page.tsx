import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { HeroParallax } from "@/components/global/connect-parallax";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { LampComponent } from "@/components/global/lamp";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constant";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div
          className="absolute inset-0 h-full w-full items-center
      px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"
        ></div>
        <div className=" flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center justify-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F]
          hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r 
          group-hover:from-black group-hover:to-black"
                  >
                    Start for Free Today
                  </span>
                </Button>
                <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Automate Your Work with Fuzzie
                </h1>
              </div>
            }
          />
        </div>
      </section>
      <InfiniteMovingCards className="md:mt-[18rem] mt-[-100px]"
      items={clients}
      direction = "right"
      speed="slow"
      />
      <section>
        <HeroParallax products={products}></HeroParallax>
      </section>
      <section className="mt-[-500px]">
        <LampComponent/>
        <div className=" flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card
            dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1]
            dark:bg-black dark:border-white/[0.2] border-black/[0.1]
            w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50"
              className="text-xl font-bold text-neutral-600
              dark:text-white">
                Hobby
                <h2 className="text-6xl">$0</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2
              dark:text-neutral-300">
                Get a glimpse of what our software is capable of. Just a heads up {"you'll"} never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 3 Free automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> 100 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  Try now →
                </CardItem>
                <CardItem translateZ={20} as={"button"} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                  Get Started Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card
            dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1]
            dark:bg-black dark:border-[#E2CBFF] border-black/[0.1]
            w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50"
              className="text-xl font-bold text-neutral-600
              dark:text-white">
                Go Pro
                <h2 className="text-6xl">$29</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2
              dark:text-neutral-300">
                Use our Software as a your personal digital clone. For when 24 hours a day just {"isn't"} enough.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 25 Active automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> 1000 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> Multi-step Logic and Loops
                  </li>
                </ul>
                <div className="flex justify-between items-center mt-8">
                  <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                    Get Started →
                  </CardItem>
                  <CardItem translateZ={20} as={"button"} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                  Buy Now
                </CardItem>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card
            dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1]
            dark:bg-black dark:border-white/[0.2] border-black/[0.1]
            w-full md:!w-[350px] h-auto rounded-xl p-6 border" >
               <CardItem translateZ="50"
              className="text-xl font-bold text-neutral-600
              dark:text-white">
                Go Elite
                <h2 className="text-6xl">$99</h2>
               </CardItem>
               <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2
              dark:text-neutral-300">
                The {` 'set it and forget it'`} dream. Honestly, you can just go take a nap now
               </CardItem>
               <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Unlimited automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> 50,000 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon/> Premium Webhooks & API access
                  </li>
                </ul>
                <div className="flex justify-between items-center mt-8">
                  <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                    Get Started →
                  </CardItem>
                  <CardItem translateZ={20} as={"button"} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                  Buy Now
                </CardItem>
                </div>  
            </CardBody>
          </CardContainer>
        </div>
      </section>
    </main>
  );
}
