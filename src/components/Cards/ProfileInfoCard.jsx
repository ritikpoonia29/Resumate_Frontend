import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLayout = () => {
    localStorage.clear();
    clearUser();
    navigate("/home");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[15px] font-bold leading-3">
              {user.name || ""}
            </div>
            {(user.subscriptionPlan === 'Premium' || user.subscriptionPlan === 'premium') ? (
              <div className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                Premium
              </div>
            ) : (
              <div className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                Basic
              </div>
            )}
          </div>
          <button
            className="text-slate-400 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLayout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
