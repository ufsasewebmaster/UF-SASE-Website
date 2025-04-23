// components/UserInfoBox.tsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { FieldConfig } from "./ConfigurableAccountBox";
import { ConfigurableAccountBox } from "./ConfigurableAccountBox";

interface updateFields {
  first_name?: string;
  last_name?: string;
  majors?: string;
  minors?: string;
  linkedin?: string;
  discord?: string;
  bio?: string;
  roles?: string;
}

function createUpdateFields(updates: Record<string, string>): updateFields {
  const out: updateFields = {};

  if (updates.name?.trim()) {
    const [first, second] = updates.name.trim().split(" ", 2);
    out.first_name = first;
    if (second) out.last_name = second;
  }
  if (updates.majors?.trim()) out.majors = updates.majors;
  if (updates.minors?.trim()) out.minors = updates.minors;
  if (updates.linkedin?.trim()) out.linkedin = updates.linkedin;
  if (updates.discord?.trim()) out.discord = updates.discord;
  if (updates.bio?.trim()) out.bio = updates.bio;
  if (updates.roles?.trim()) out.roles = updates.roles;

  return out;
}

interface UserInfoBoxProps {
  first_name: string;
  last_name: string;
  majors: string;
  minors: string;
  linkedin: string;
  discord: string;
  roles: string;
}

export default function UserInfoBox(props: UserInfoBoxProps) {
  const [info, setInfo] = useState({
    first_name: props.first_name,
    last_name: props.last_name,
    majors: props.majors,
    minors: props.minors,
    linkedin: props.linkedin,
    discord: props.discord,
    roles: props.roles,
    bio: "", // if you have an initial bio, pass it via props
  });

  const initialData: Record<string, string> = {
    name: `${info.first_name} ${info.last_name}`,
    majors: info.majors,
    minors: info.minors,
    linkedin: info.linkedin,
    discord: info.discord,
    roles: info.roles,
    bio: info.bio,
  };

  const fieldConfigs: Array<FieldConfig> = [
    { name: "name", label: "Name", type: "text", editable: true },
    { name: "majors", label: "Majors", type: "text", editable: true },
    { name: "minors", label: "Minors", type: "text", editable: true },
    { name: "linkedin", label: "LinkedIn", type: "text", editable: true },
    { name: "discord", label: "Discord", type: "text", editable: true },
    { name: "roles", label: "Roles", type: "text", editable: true },
    { name: "bio", label: "Bio", type: "text", editable: true, multiline: true },
  ];

  const handleSave = async (updates: Record<string, string>) => {
    try {
      const payload = createUpdateFields(updates);
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setInfo((prev) => ({ ...prev, ...payload }));
      toast.success("Info saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save info.");
    }
  };

  return <ConfigurableAccountBox initialData={initialData} fieldConfigs={fieldConfigs} handleLogout={() => {}} onSave={handleSave} />;
}
