import React from "react";
import { siteConfig } from "@/configs/config";

const ProjectsSection: React.FC = () => {
  const hasProjects = siteConfig.projects && siteConfig.projects.length > 0;

  if (!hasProjects) return null;

  return (
    <section id="projects" className="p-8 sm:p-12 md:p-16 lg:p-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold text-gray-900">
              Projects
            </h2>
            <div className="w-[75px] h-[5px] mt-2 rounded-full bg-accent" />
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-8">
              {siteConfig.projects.map((project, index) => {
                const isLink = Boolean(project.link);
                const Component = isLink ? "a" : "div";
                const linkProps = isLink
                  ? {
                      href: project.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <div key={index} className="group relative">
                    <Component
                      {...linkProps}
                      className={`block relative p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 transition-all duration-300 ${
                        isLink
                          ? "hover:bg-white hover:shadow-xl hover:border-gray-300 hover:-translate-y-1"
                          : ""
                      }`}
                    >
                      {isLink && (
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-gray-900 rounded-full text-white transition-all duration-300 group-hover:bg-gray-700">
                          <svg
                            className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 17L17 7M17 7H7M17 7V17"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <span
                            className="text-sm font-mono"
                            style={{ color: siteConfig.accentColor }}
                          >
                            0{index + 1}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                            {project.name}
                          </h3>
                        </div>

                        <p
                          className={`text-base sm:text-lg text-gray-600 leading-relaxed ${
                            isLink ? "pr-12 sm:pr-14 md:pr-16" : ""
                          }`}
                        >
                          {project.description}
                        </p>

                        {project.skills && project.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                            {project.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                                  isLink ? "group-hover:bg-gray-800" : ""
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Component>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
