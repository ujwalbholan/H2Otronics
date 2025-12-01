import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { LogOut, User, Mail, Phone, Camera } from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("authToken");
        if (!token) return;

        const res = await axios.get(
          "https://h2otronics.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    const token = Cookies.get("authToken");

    try {
      await axios.post(
        "https://h2otronics.onrender.com/api/auth/logout",
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      Cookies.remove("authToken");
      window.location.href = "/signin";
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Settings</h1>

      <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-slate-200">
          <div className="relative">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700">
              <Camera size={16} />
              <input type="file" className="hidden" />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              {user.name}
            </h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* User Info Form */}
        <div className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-1">Full Name</p>
            <div className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg bg-slate-50">
              <User size={18} className="text-slate-500" />
              <input
                type="text"
                defaultValue={user.name}
                className="bg-transparent outline-none w-full text-slate-700"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Email Address
            </p>
            <div className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg bg-slate-50">
              <Mail size={18} className="text-slate-500" />
              <input
                type="email"
                defaultValue={user.email}
                className="bg-transparent outline-none w-full text-slate-700"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Phone Number (optional)
            </p>
            <div className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg bg-slate-50">
              <Phone size={18} className="text-slate-500" />
              <input
                type="text"
                defaultValue={user.phone || ""}
                className="bg-transparent outline-none w-full text-slate-700"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              disabled={isSaving}
              className="w-full md:w-48 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md transition disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
