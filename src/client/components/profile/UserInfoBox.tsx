// src/components/profile/UserInfoBox.tsx
import type { professionalInfoSchema } from "@shared/schema/professionalInfoSchema";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { z } from "zod";
import { ConfigurableAccountBox, type FieldConfig } from "./ConfigurableAccountBox";

type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
type UserInfoBoxProps = Omit<ProfessionalInfo, "userId"> & {
  onSave: (updates: Partial<Omit<ProfessionalInfo, "userId">>) => Promise<void> | void;
};

export default function UserInfoBox(props: UserInfoBoxProps) {
  const [info, setInfo] = useState<Omit<ProfessionalInfo, "userId">>({
    phone: props.phone,
    discord: props.discord,
    bio: props.bio,
    resumePath: props.resumePath,
    linkedin: props.linkedin,
    portfolio: props.portfolio,
    majors: props.majors,
    minors: props.minors,
    graduationSemester: props.graduationSemester,
  });

  const initialData: Record<string, string> = {
    phone: info.phone ?? "",
    discord: info.discord ?? "",
    bio: info.bio ?? "",
    resumePath: info.resumePath ?? "",
    linkedin: info.linkedin ?? "",
    portfolio: info.portfolio ?? "",
    majors: info.majors ?? "",
    minors: info.minors ?? "",
    graduationSemester: info.graduationSemester ?? "",
  };

  const fieldConfigs: Array<FieldConfig> = [
    { name: "phone", label: "Phone", type: "text", editable: true },
    { name: "discord", label: "Discord", type: "text", editable: true },
    { name: "bio", label: "Bio", type: "text", editable: true, multiline: true },
    { name: "resumePath", label: "Resume Path", type: "text", editable: true },
    { name: "linkedin", label: "LinkedIn", type: "text", editable: true },
    { name: "portfolio", label: "Portfolio", type: "text", editable: true },
    { name: "majors", label: "Majors", type: "text", editable: true },
    { name: "minors", label: "Minors", type: "text", editable: true },
    { name: "graduationSemester", label: "Graduation Semester", type: "text", editable: true },
  ];

  const handleSave = async (updates: Record<string, string>) => {
    const payload: Partial<Omit<ProfessionalInfo, "userId">> = {};
    for (const [key, val] of Object.entries(updates)) {
      if (val.trim()) {
        (payload as Partial<Omit<ProfessionalInfo, "userId">>)[key as keyof Omit<ProfessionalInfo, "userId">] = val;
      }
    }
    try {
      await props.onSave(payload);
      setInfo((prev) => ({ ...prev, ...payload }));
      toast.success("Info saved successfully!");
    } catch {
      toast.error("Failed to save info.");
    }
  };

  return <ConfigurableAccountBox initialData={initialData} fieldConfigs={fieldConfigs} onSave={handleSave} />;
}
