import React from "react";
import { siteConfig } from "@/configs/config";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="p-8 sm:p-12 md:p-16 lg:p-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-gray-900">
              About Me
            </h2>
            <div className="w-[75px] h-[5px] mt-2 rounded-full bg-accent"></div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600">
              {siteConfig.aboutMe}
            </p>

            <div className="pt-4">
              <div className="flex flex-wrap gap-3">
                {siteConfig.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-800 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
