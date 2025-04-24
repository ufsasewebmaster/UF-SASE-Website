// src/routes/profile/settings.tsx
import { DarkModeContext } from "@components/DarkModeProvider";
import SettingsBox from "@components/profile/SettingsBox";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/profile/settings")({
  component: () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return <SettingsBox darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  },
});
