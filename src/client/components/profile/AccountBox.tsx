// components/AccountBox.tsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { FieldConfig } from "./ConfigurableAccountBox";
import { ConfigurableAccountBox } from "./ConfigurableAccountBox";

interface AccountBoxProps {
  handleLogout: () => void;
  username: string;
  email: string;
  bio: string;
}

export default function AccountBox({ bio: initialBio, email: initialEmail, handleLogout, username: initialUsername }: AccountBoxProps) {
  // lift state here
  const [info, setInfo] = useState({
    username: initialUsername,
    email: initialEmail,
    bio: initialBio,
  });

  const fieldConfigs: Array<FieldConfig> = [
    { name: "username", label: "Username", type: "text", editable: true },
    { name: "email", label: "Email", type: "email", editable: true },
    {
      name: "password",
      label: "Password",
      type: "password",
      editable: false,
      showResetLink: true,
      resetLinkUrl: "/api/email/password-reset",
    },
    { name: "bio", label: "Bio", type: "text", editable: true, multiline: true },
  ];

  const initialData: Record<string, string> = {
    username: info.username,
    email: info.email,
    password: "",
    bio: info.bio,
  };

  const handleSave = async (updates: Record<string, string>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // merge into parent state so the UI stays updated
      setInfo((prev) => ({ ...prev, ...updates }));
      toast.success("Info saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save info.");
    }
  };

  return <ConfigurableAccountBox initialData={initialData} fieldConfigs={fieldConfigs} handleLogout={handleLogout} onSave={handleSave} />;
}
