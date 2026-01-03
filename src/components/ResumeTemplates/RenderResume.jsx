import React from "react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";

const RenderResume = ({
  templateId,
  resumeData,
  colorPalette,
  containerWidth,
  download
}) => {
  switch (templateId) {
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
          download = {download}
        />
      );
    case "02":
      return (
        <TemplateTwo
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
          download = {download}
        />
      );
    case "03":
      return (
        <TemplateThree
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
          download = {download}
        />
      );
    default:
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
          download = {download}
        />
      );
  }
};

export default RenderResume;
