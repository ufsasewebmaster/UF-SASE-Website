// components/ConfigurableAccountBox.tsx
import { useTimer } from "@hooks/useTimer";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

export type FieldType = "text" | "email" | "password" | "number";
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  editable: boolean;
  showResetLink?: boolean;
  resetLinkUrl?: string;
  multiline?: boolean;
}

interface Props {
  initialData: Record<string, string>;
  fieldConfigs: Array<FieldConfig>;
  onSave: (updates: Record<string, string>) => void | Promise<void>;
}

export function ConfigurableAccountBox({ fieldConfigs, initialData, onSave }: Props) {
  const { handleSubmit, register, reset } = useForm<Record<string, string>>();
  const [isEditing, setIsEditing] = useState(false);
  const { seconds, startTimer, timerRunning } = useTimer();
  // seed form whenever initialData changes
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    const updates: Record<string, string> = {};
    fieldConfigs.forEach((cfg) => {
      if (cfg.editable) {
        const v = data[cfg.name] || "";
        if (v !== (initialData[cfg.name] || "")) updates[cfg.name] = v;
      }
    });
    await onSave(updates);

    setIsEditing(false);
  };

  const handleResetButtonClicked = (e: React.MouseEvent, resetLink: string) => {
    e.preventDefault();
    if (timerRunning) return;
    try {
      fetch(resetLink, {
        method: "POST",
        body: JSON.stringify({ email: initialData.email || "" }),
      });

      startTimer(10);
    } catch (err) {
      console.log("Password reset email couldn't be sent.", err);
    }
  };

  return (
    <div className="group w-3/4 rounded-2xl bg-background px-10 py-6 shadow-xl">
      {/* header */}
      <div className="mb-6 flex items-center">
        <h2 className="text-xl font-bold">Account Settings</h2>
        <div className="ml-auto flex gap-8">
          {isEditing && (
            <button type="submit" form="accountSettingsForm" /* NOTE the linking of id here */ className="flex items-center gap-2 hover:scale-105">
              <Icon icon="material-symbols:save" width="24" height="24" color="#0668B3" />
              <p className="font-semibold text-saseBlue">Save Changes</p>
            </button>
          )}
          <button type="button" className="flex items-center gap-2 hover:scale-105" onClick={() => setIsEditing((p) => !p)}>
            <Icon icon={isEditing ? "material-symbols:close" : "material-symbols:edit"} width="24" height="24" color="#0668B3" />
            <p className="font-semibold text-saseBlue">{isEditing ? "Cancel" : "Edit"}</p>
          </button>
        </div>
      </div>

      <form id="accountSettingsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fieldConfigs.map((cfg) => (
            <div key={cfg.name} className="flex flex-col gap-2">
              <label className="pl-2 font-medium">{cfg.label}</label>

              {isEditing && cfg.editable ? (
                cfg.multiline ? (
                  <textarea rows={3} {...register(cfg.name)} className="rounded-lg border px-4 py-2" />
                ) : (
                  <input type={cfg.type} {...register(cfg.name)} className="rounded-lg border px-4 py-2" />
                )
              ) : cfg.name === "password" ? (
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg bg-gray-50 px-4 py-2">••••••••</div>
                  {cfg.showResetLink && cfg.resetLinkUrl && isEditing && (
                    <a
                      href={cfg.resetLinkUrl}
                      onClick={(e) => handleResetButtonClicked(e, cfg.resetLinkUrl || "")}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {timerRunning ? `Can send link again in (${seconds}s)` : "Send password reset link"}
                    </a>
                  )}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 px-4 py-2 text-black">{initialData[cfg.name] || "-"}</div>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
