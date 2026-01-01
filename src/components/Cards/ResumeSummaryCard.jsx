import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#f9fafb"); // light gray default

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor("#f9fafb"));
    }
  }, [imgUrl]);

  return (
    <div
      onClick={onSelect}
      className="
        h-[300px]
        flex flex-col
        rounded-2xl
        border border-white/10
        overflow-hidden
        cursor-pointer
        bg-[#0E1324]
        hover:border-gray-400/40
        transition
      "
    >
      {/* -------- Preview Area -------- */}
      <div
        className="w-full flex-1 p-2"
        style={{ backgroundColor: bgColor }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-white/40 rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Preview</span>
          </div>
        )}
      </div>

      {/* -------- Footer (ALWAYS readable) -------- */}
      <div className="w-full px-4 py-3 bg-[#0B0F19]">
        <h5 className="text-sm font-medium text-gray-200 truncate">
          {title}
        </h5>
        <p className="text-xs text-gray-400 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
