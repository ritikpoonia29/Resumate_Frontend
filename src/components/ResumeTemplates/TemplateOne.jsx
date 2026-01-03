import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Rss,
  Github,
  User,
  Linkedin,
} from "lucide-react";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

/* ---------- Neutral Professional Palette ---------- */
const DEFAULT_THEME = [
  "#F3F4F6", // sidebar bg (light gray)
  "#E5E7EB", // section underline
  "#E5E7EB", // chip bg
  "#374151", // accent text
  "#111827", // primary text
];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-3">
      <span
        className="absolute bottom-0 left-0 w-full h-[6px]"
        style={{ backgroundColor: color }}
      />
      <h2 className="relative text-sm font-bold uppercase tracking-wide text-gray-800">
        {text}
      </h2>
    </div>
  );
};

const TemplateOne = ({ resumeData, colorPalette, containerWidth, download }) => {
  const themeColors = colorPalette?.length ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!resumeRef.current) return;
    const actualWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualWidth);
    setScale(containerWidth / actualWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className = {download?"bg-white p-6 overflow-y-auto custom-scrollbar":"bg-white p-6 max-h-[80vh] overflow-y-auto custom-scrollbar"}
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: `${baseWidth}px`,
      }}
    >
      <div className="grid grid-cols-12 gap-8 text-gray-800">
        {/* ---------------- LEFT SIDEBAR ---------------- */}
        <aside
          className="col-span-4 py-10 px-5"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: themeColors[1] }}
            >
              {resumeData.profileInfo.profilePreviewUrl ? (
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  className="w-[90px] h-[90px] rounded-full"
                />
              ) : (
                <User size={42} className="text-gray-600" />
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              {resumeData.profileInfo.fullName}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {resumeData.profileInfo.designation}
            </p>
          </div>

          {/* Contact */}
          <div className="mt-6 space-y-4">
            <ContactInfo icon={<MapPin />} value={resumeData.contactInfo.location} />
            <ContactInfo icon={<Mail />} value={resumeData.contactInfo.email} />
            <ContactInfo icon={<Phone />} value={resumeData.contactInfo.phone} />
            {resumeData.contactInfo.linkedin && (
              <ContactInfo icon={<Linkedin />} value={resumeData.contactInfo.linkedin} />
            )}
            {resumeData.contactInfo.github && (
              <ContactInfo icon={<Github />} value={resumeData.contactInfo.github} />
            )}
            <ContactInfo icon={<Rss />} value={resumeData.contactInfo.website} />
          </div>

          {/* Education */}
          <div className="mt-6">
            <Title text="Education" color={themeColors[1]} />
            {resumeData.education.map((edu, i) => (
              <EducationInfo
                key={i}
                degree={edu.degree}
                institution={edu.institution}
                duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(
                  edu.endDate
                )}`}
              />
            ))}
          </div>

          {/* Languages */}
          <div className="mt-6">
            <Title text="Languages" color={themeColors[1]} />
            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>
        </aside>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="col-span-8 pr-8 pb-6">
          {/* Summary */}
          <section>
            <Title text="Professional Summary" color={themeColors[1]} />
            <p className="text-sm leading-relaxed text-gray-700">
              {resumeData.profileInfo.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-5">
            <Title text="Work Experience" color={themeColors[1]} />
            {resumeData.workExperience.map((work, i) => (
              <WorkExperience
                key={i}
                company={work.company}
                role={work.role}
                duration={`${formatYearMonth(work.startDate)} - ${formatYearMonth(
                  work.endDate
                )}`}
                durationColor={themeColors[3]}
                description={work.description}
              />
            ))}
          </section>

          {/* Projects */}
          <section className="mt-5">
            <Title text="Projects" color={themeColors[1]} />
            {resumeData.projects.map((project, i) => (
              <ProjectInfo
                key={i}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </section>

          {/* Skills */}
          <section className="mt-5">
            <Title text="Skills" color={themeColors[1]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </section>

          {/* Certifications */}
          <section className="mt-5">
            <Title text="Certifications" color={themeColors[1]} />
            <div className="grid grid-cols-2 gap-2">
              {resumeData.certifications.map((cert, i) => (
                <CertificationInfo
                  key={i}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </section>

          {/* Interests */}
          {resumeData.interests?.length > 0 && (
            <section className="mt-5">
              <Title text="Interests" color={themeColors[1]} />
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map(
                  (interest, i) =>
                    interest && (
                      <span
                        key={i}
                        className="text-[11px] px-3 py-1 rounded-md bg-gray-200 text-gray-700"
                      >
                        {interest}
                      </span>
                    )
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateOne;
