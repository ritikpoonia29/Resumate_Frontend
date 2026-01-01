import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";



const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-[#0E1324]/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard">
          <div className="flex items-center gap-2 text-xl font-bold">
                    <FileText className="text-gray-400" />
                    ResuMate
                  </div>
        </Link>

        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;


// export default Navbar;
