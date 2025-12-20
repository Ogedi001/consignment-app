"use client";
import { siteConfig } from "@/configs/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Best Logistics Service ",
    highlight: "Provider",
    text: "We are committed to providing our customers with exceptional service while offering our employees the best environment to grow and succeed.",
  },
  {
    title: "Road Transport Express ",
    highlight: "Delivery",
    text: "Fast, reliable, and affordable transport solutions tailored to your needs.",
  },
];

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative isolate overflow-hidden bg-white py-24 md:h-screen accent-accent"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse 800px 1200px at 0% 0%, ${siteConfig.accentColor}40 0%, ${siteConfig.accentColor}25 20%, ${siteConfig.accentColor}10 40%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.8) 90%, white 100%)`,
        }}
      ></div>
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
          <pattern
            id="programming-symbols"
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            <text
              x="50"
              y="50"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="24"
              transform="rotate(-15)"
            >
              &lt;/&gt;
            </text>
            <text
              x="150"
              y="100"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="20"
              transform="rotate(10)"
            >
              {}
            </text>
            <text
              x="250"
              y="80"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="18"
              transform="rotate(-5)"
            >
              =&gt;
            </text>
            <text
              x="100"
              y="200"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="22"
              transform="rotate(15)"
            >
              []
            </text>
            <text
              x="300"
              y="180"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="20"
              transform="rotate(-10)"
            >
              &lt;&gt;
            </text>
            <text
              x="200"
              y="250"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="24"
              transform="rotate(5)"
            >
              ()
            </text>
            <text
              x="50"
              y="320"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="18"
              transform="rotate(-8)"
            >
              ::
            </text>
            <text
              x="350"
              y="300"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="22"
              transform="rotate(12)"
            >
              ==
            </text>
            <text
              x="150"
              y="350"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="20"
              transform="rotate(-15)"
            >
              ++
            </text>
            <text
              x="250"
              y="370"
              fill={siteConfig.accentColor}
              fontFamily="monospace"
              fontSize="24"
              transform="rotate(8)"
            >
              ;
            </text>
          </pattern>
        </defs>
        <rect
          fill="url(#programming-symbols)"
          width="100%"
          height="100%"
          opacity="0.2"
        ></rect>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        ></rect>
      </svg>

      <Carousel className="h-full mx-auto p-8 sm:p-12 md:p-24 flex items-center max-w-7xl">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-row gap-8 items-center">
                <div>
                  <h1 className="mt-6 sm:mt-8 md:mt-10 text-pretty text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-800 animate-fade-in animation-delay-200">
                    {slide.title}{" "}
                    <span className="text-accent underline">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p className="mt-4 sm:mt-6 md:mt-8 text-pretty text-base sm:text-lg md:text-xl/8 font-medium text-gray-600 animate-fade-in animation-delay-400">
                    {slide.text}
                  </p>

                  <div className="pt-6  flex flex-col md:flex-row gap-4 sm:gap-x-6 md:gap-x-8 text-gray-700 animate-fade-in animation-delay-600">
                    <Button asChild>
                      <Link href="#track">
                        Track Your Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <Link href="#track">Our Services</Link>
                    </Button>
                  </div>
                </div>

                <div>
                  <Image
                    src="/photo-c1.avif"
                    alt="Ogedi Favour Uchibeke"
                    width={600}
                    height={600}
                    className="rounded-md hidden sm:block"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="left-2 md:left-4" />
        <CarouselNext className="right-2 md:right-4" />
      </Carousel>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
