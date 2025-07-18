import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "@/components/hero8-header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main id="home" className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:flex-row lg:items-center lg:gap-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  L&SD
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-lg">
                  office supplies, computers, services, and enterprises 
                </p>

                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Highly customizable components for building modern websites
                  and applications that look and feel the way you mean it.
                </p>
                  

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
  <Link href="https://www.facebook.com/people/LSD-TRADING/100075835426661" target="_blank" rel="noopener noreferrer">
    <span className="whitespace-nowrap">Contact Us</span>
  </Link>
</Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base"
                  >
                    <Link href="#link">
                      <span className="text-nowrap">Free Delivery</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center items-center">
                <Image
                  src="/big-hero-image.jpg"
                  alt="Big Hero Visual"
                  width={700}
                  height={600}
                  className="rounded-xl shadow-2xl object-cover w-full h-auto max-w-[700px]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Our Products</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
  <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
    <div className="flex items-center justify-center w-fit px-6">
      {/* HP - uses a clean, modern sans-serif */}
      <span className="text-center text-lg font-bold dark:text-white" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        HP
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* Intel - modern geometric sans-serif */}
      <span className="text-center text-lg font-semibold italic dark:text-white" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        Intel
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* Canon - serif font with classic feel */}
      <span className="text-center text-lg font-semibold dark:text-white" style={{ fontFamily: "'Times New Roman', serif" }}>
        Canon
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* Asus - strong, tech-style sans-serif */}
      <span className="text-center text-lg font-extrabold dark:text-white" style={{ fontFamily: "'Verdana', Geneva, Tahoma, sans-serif" }}>
        Asus
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* AMD - bold and modern sans-serif */}
      <span className="text-center text-lg font-black dark:text-white" style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}>
        AMD
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* Epson - clean sans-serif */}
      <span className="text-center text-lg font-semibold dark:text-white" style={{ fontFamily: "'Calibri', Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif" }}>
        Epson
      </span>
    </div>
    <div className="flex items-center justify-center w-fit px-6">
      {/* Brother - slightly rounded, simple sans-serif */}
      <span className="text-center text-lg font-semibold dark:text-white" style={{ fontFamily: "'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif" }}>
        Brother
      </span>
    </div>
  </InfiniteSlider>

  <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
  <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
  <ProgressiveBlur
    className="pointer-events-none absolute left-0 top-0 h-full w-20"
    direction="left"
    blurIntensity={1}
  />
  <ProgressiveBlur
    className="pointer-events-none absolute right-0 top-0 h-full w-20"
    direction="right"
    blurIntensity={1}
  />
</div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
