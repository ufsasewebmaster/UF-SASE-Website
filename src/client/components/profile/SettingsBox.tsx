import DarkButton from "@components/DarkButton";
import { DarkModeContext } from "@components/DarkModeProvider";
import { Button } from "@components/ui/button";
import { useContext, useState } from "react";

interface SettingsBoxProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsBox: React.FC<SettingsBoxProps> = ({ darkMode, toggleDarkMode }) => {
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleEmailToggle = () => {
    setEmailNotifications(!emailNotifications);
    alert(`Email notifications ${!emailNotifications ? "enabled" : "disabled"}`);
  };

  return (
    <div className="group min-h-[500px] w-3/4 rounded-2xl bg-white px-10 py-6 shadow-xl">
      <h1 className="mb-10 text-3xl font-bold text-gray-800">Settings</h1>

      {/* Dark Mode Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-lg font-medium text-gray-700">Theme (Light/Dark)</span>
        <DarkButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Email Notifications */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-lg font-medium text-gray-700">Email Notifications</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" checked={emailNotifications} onChange={handleEmailToggle} />
          <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-saseGreen peer-checked:after:translate-x-full" />
        </label>
      </div>

      {/* Delete Account Button (Dummy) */}
      <div className="mt-10 flex justify-center">
        <button className="w-1/2 rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600" disabled>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsBox;
