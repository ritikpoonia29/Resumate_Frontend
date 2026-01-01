import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { CirclePlus } from "lucide-react";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const handleResumeCreated = () => {
    fetchAllResumes();
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
    <DashboardLayout>
      {/* ===== FULL PAGE DARK BACKGROUND ===== */}
      <div className="min-h-screen bg-[#0B0F19] px-4 md:px-0 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-6">
          
          {/* -------- Add New Resume Card -------- */}
          <div
            onClick={() => setOpenCreateModal(true)}
            className="
  h-[250px]
  flex flex-col items-center justify-center gap-4
  rounded-2xl
  bg-[#0E1324]
  cursor-pointer
  hover:border-gray-400/40
  hover:scale-[1.02]
  transition-all
  ml-[38px]
"

          >
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#0E1324]/10">
              <CirclePlus className="text-gray-300 w-6 h-6" />
            </div>

            <h3 className="font-medium text-white">
              Create New Resume
            </h3>
          </div>

          {/* -------- Resume Cards -------- */}
          {allResumes?.map((resume, index) => (
            <ResumeSummaryCard
              key={resume?._id || `resume-${index}`}
              imgUrl={resume?.thumbnailLink || null}
              title={resume.title}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}
            />
          ))}
        </div>
      </div>

      {/* -------- Create Resume Modal -------- */}
      <Modal isOpen={openCreateModal} onClose={handleCloseModal} hideHeader>
        <div className="bg-[#0E1324] rounded-2xl">
          <CreateResumeForm
            onResumeCreated={handleResumeCreated}
            onClose={handleCloseModal}
          />
        </div>
      </Modal>
    </DashboardLayout>
    </div>
  );
};

export default Dashboard;
