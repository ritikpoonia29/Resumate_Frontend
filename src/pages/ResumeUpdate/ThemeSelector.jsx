import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../utils/data";
import { CircleCheckBig } from "lucide-react";
import Tabs from "../../components/Tabs";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import paymentService from "../../services/paymentService";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const { user, refreshUser } = useContext(UserContext);
  const resumeRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");

  const [templateRestrictions, setTemplateRestrictions] = useState({
    availableTemplates: [],
    // subscriptionPlan: "basic",
    subscriptionPlan: "premium",
    isPremium: false,
  });
  const navigate = useNavigate();

  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  /* ------------------ Fetch template restrictions ------------------ */
  useEffect(() => {
    if (!user) return;

    const fetchTemplateRestrictions = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
        setTemplateRestrictions(res.data);
      } catch {
        toast.error("Failed to load template restrictions");
      }
    };

    fetchTemplateRestrictions();
  }, [user]);

  /* ------------------ Resize handler ------------------ */
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  /* ------------------ Template lock logic ------------------ */
  const isTemplateLocked = (templateId) => {
    if (templateId === "01") return false;
    return !templateRestrictions.availableTemplates.includes(templateId);
  };

  const handleLockedTemplateClick = () => {
    toast("Upgrade to Premium to unlock all templates", {
      icon: "🔒",
      style: {
        background: "#1f2937",
        color: "#fff",
      },
    });
  };

  /* ------------------ Apply theme ------------------ */
  const handleThemeSelection = () => {
    if (!setSelectedTheme) {
      navigate("/home");
    }
    else {
      setSelectedTheme({
        colorPalette: selectedColorPalette.colors,
        theme: selectedTemplate.theme,
      });
      onClose();
    }

  };

  /* ------------------ Upgrade flow ------------------ */
  const handleUpgradeToPremium = async () => {
    try {
      toast.loading("Creating order...", { id: "payment" });

      const orderData = await paymentService.createOrder("premium");
      toast.loading("Opening payment gateway...", { id: "payment" });

      await paymentService.initiatePayment(orderData, user);

      toast.success("Welcome to Premium 🎉", { id: "payment" });

      await refreshUser();

      const res = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
      setTemplateRestrictions(res.data);
    } catch (error) {
      toast.error(error.message || "Payment failed", { id: "payment" });
    }
  };

  return (
    /* ================= FULL PAGE DARK BACKGROUND ================= */
    <div className="min-h-screen w-full bg-[#0B0F19] text-white">
      <div className="container mx-auto p-4">
        <div className="rounded-2xl">
          {/* ------------------ Header ------------------ */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Tabs
                tabs={TAB_DATA}
                activeTab={tabValue}
                setActiveTab={setTabValue}
              />

              {!templateRestrictions.isPremium ? (
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                    Basic Plan
                  </span>
                  <button
                    onClick={handleUpgradeToPremium}
                    className="
                      bg-gradient-to-r from-slate-700 to-gray-400
                      text-black px-4 py-1 rounded-full text-sm font-semibold
                      hover:opacity-90 transition cursor-pointer
                    "
                  >
                    {/* Upgrade ₹999
                     */}
                    Upgrade ₹1
                  </button>
                </div>
              ) : (
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  Premium Plan
                </span>
              )}
            </div>

            <button
              onClick={handleThemeSelection}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              <CircleCheckBig size={16} />
              Done
            </button>
          </div>

          {/* ------------------ Content ------------------ */}
          <div className="grid grid-cols-12 gap-5">
            {/* Left Panel */}
            <div className="col-span-12 md:col-span-5 bg-[#0E1324] border border-[#0E1324]/10 rounded-xl">
              <div className="grid grid-cols-2 gap-4 p-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {tabValue === "Templates" &&
                  resumeTemplates.map((template, index) => {
                    const locked = isTemplateLocked(template.id);
                    return (
                      <TemplateCard
                        key={template.id}
                        thumbnailImg={template.thumbnailImg}
                        isSelected={
                          selectedTemplate.index === index && !locked
                        }
                        isLocked={locked}
                        onSelect={() =>
                          !locked &&
                          setSelectedTemplate({
                            theme: template.id,
                            index,
                          })
                        }
                        onLockedClick={handleLockedTemplateClick}
                      />
                    );
                  })}

                {tabValue === "Color Palettes" &&
                  themeColorPalette.themeOne.map((colors, index) => (
                    <ColorPalette
                      key={index}
                      colors={colors}
                      isSelected={selectedColorPalette.index === index}
                      onSelect={() =>
                        setSelectedColorPalette({ colors, index })
                      }
                    />
                  ))}
              </div>
            </div>

            {/* Right Panel */}
            <div
              ref={resumeRef}
              // className="col-span-12 md:col-span-7 bg-[#0E1324] border border-white/10 rounded-xl p-3"
              className="col-span-12 md:col-span-7 bg-[#0E1324] max-h-[85vh] overflow-y-auto"
            >
              <RenderResume
                templateId={selectedTemplate.theme}
                resumeData={resumeData || DUMMY_RESUME_DATA}
                containerWidth={baseWidth}
                colorPalette={selectedColorPalette.colors || []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

/* ------------------ Color Palette ------------------ */

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        h-28 flex rounded-xl overflow-hidden cursor-pointer
        border transition
        ${isSelected
          ? "border-gray-300"
          : "border-[#0E1324]/10 hover:border-[#0E1324]/30"
        }
      `}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
