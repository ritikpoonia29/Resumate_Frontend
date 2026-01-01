import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Star,
  FileText,
  ShieldCheck,
  Zap,
  Eye,
  Download,
  EllipsisVertical,
} from "lucide-react";
import toast from "react-hot-toast";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { UserContext } from "../context/userContext";
import paymentService from "../services/paymentService";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("emailVerified");
    if (!verified) return;

    if (sessionStorage.getItem("emailVerifiedToastHandled")) return;

    if (verified === "success") {
      toast.success("Email verified successfully. You can now log in.")
      setOpenAuthModal(true);
    }
    else {
      toast.error("Email verification failed.");
    }

    sessionStorage.setItem("emailVerifiedToastHandled", "true");
    navigate(location.pathname, { replace: true });
  }, [location, navigate]);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
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

  const handleTemplates = () => {
    navigate("/ThemeSelector")
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-400">
          <img
  src="/resume3.svg"
  alt="ResuMate Logo"
  className="w-13 h-13"
/>
            ResuMate
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-slate-700 to-gray-400 hover:opacity-90 cursor-pointer"
            >
              Get Started
            </button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10">
              <Star className="w-4 h-4 text-yellow-400" />
              Trusted by 1,000+ professionals
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Build ATS-Optimized

              <span className="block bg-gradient-to-r from-slate-700 to-gray-400 bg-clip-text text-transparent">
                Resumes That Get Hired
              </span>
            </h1>

            <p className="text-gray-300 text-lg max-w-xl mb-10">
              Create professional resumes in minutes. Designed to pass ATS
              filters and impress recruiters at top companies.
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleCTA}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-slate-700 to-gray-400 text-lg font-semibold flex items-center gap-2 hover:scale-[1.02] transition cursor-pointer"
              >
                Build My Resume
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleTemplates}
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition cursor-pointer">
                View Templates
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-14 text-center">
              <div>
                <div className="text-2xl font-bold">1K+</div>
                <div className="text-gray-400 text-sm">Resumes Built</div>
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-gray-400 text-sm">ATS Pass Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-gray-400 text-sm">User Rating</div>
              </div>
            </div>
          </div>

          {/* <div className="relative">
            <img
              src={HERO_IMG}
              alt="Resume Preview"
              className="rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="absolute -z-10 inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          </div> */}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-[#0E1324]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need to Get Hired
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Zap />,
                title: "Smart Resume Builder",
                desc: "Create resumes in minutes with intelligent formatting.",
              },
              {
                icon: <Eye />,
                title: "Live Preview",
                desc: "See changes instantly with real-time preview.",
              },
              {
                icon: <Download />,
                title: "Multiple Exports",
                desc: "Download PDF, DOCX or share instantly.",
              },
              {
                icon: <ShieldCheck />,
                title: "ATS Optimized",
                desc: "Built to pass modern Applicant Tracking Systems.",
              },
              {
                icon: <FileText />,
                title: "Professional Templates",
                desc: "Modern templates trusted by recruiters.",
              },
              {
                icon: <Check />,
                title: "Secure & Private",
                desc: "Your data stays private and encrypted.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">Choose the plan that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            {/* <div className="bg-slate-500 border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"> */}
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-2">₹0</div>
                <p className="text-blue-100">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>1 Professional Template</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Basic Editing Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>PDF Download</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Email Support</span>
                </li>
              </ul>

              <button
                // className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                className="w-full text-sm font-medium text-white bg-gradient-to-r from-slate-700 to-gray-400 shadow-lg shadow-slate-900/20 p-[10px] py-3 rounded-xl hover:shadow-xl hover:from-slate-900 hover:to-gray-600 transition-all duration-300 cursor-pointer"
                onClick={handleCTA}
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1">

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                {/* <div className="text-4xl font-bold mb-2">₹999</div> */}
                <div className="text-4xl font-bold mb-2">₹1</div>
                <p className="text-blue-100">Unlock all features</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>All Premium Templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Advanced Editing Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Multiple Export Formats</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Custom Branding</span>
                </li>
              </ul>

              <button
                className="w-full text-sm font-medium text-white bg-gradient-to-r from-slate-700 to-gray-400 shadow-lg shadow-slate-900/20 p-[10px] py-3 rounded-xl hover:shadow-xl hover:from-slate-900 hover:to-gray-600 transition-all duration-300 cursor-pointer"
                onClick={handleUpgradeToPremium}
              >
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-[#0E1324]">
        <h2 className="text-4xl font-bold mb-6">
          Your Dream Job Starts With Your Resume
        </h2>
        <p className="text-gray-300 mb-10">
          Join thousands of professionals who upgraded their careers.
        </p>
        <button
          onClick={handleCTA}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-slate-700 to-gray-400 text-lg font-semibold hover:shadow-xl hover:from-slate-900 hover:to-gray-600 transition-all duration-300 cursor-pointer"
        >
          Start Building For Free
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10 text-center text-gray-400">
        © 2026 ResuMate — Beat the ATS 🚀
      </footer>

      {/* AUTH MODAL */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </div>
  );
};

export default LandingPage;
