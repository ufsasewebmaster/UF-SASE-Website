import { apiFetch } from "@/shared/utils";
import { useAuth } from "@hooks/AuthContext";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { z } from "zod";

const UserInfoBox = () => {
  const { bio = "", discord = "", email = "", roles = "", ufid = "", updateProfile, username = "" } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    ufid: "",
    bio: "",
    discord: "",
    roles: "",
    email: "",
  });

  useEffect(() => {
    setUserInfo({
      name: username,
      ufid,
      bio,
      discord,
      roles,
      email,
    });
  }, [username, bio, ufid, discord, roles, email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        username: userInfo.name,
        bio: userInfo.bio,
        ufid: userInfo.ufid,
        discord: userInfo.discord,
        roles: userInfo.roles,
        email: userInfo.email,
      };

      const response = await apiFetch(
        "/api/profile",
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
        z.object({
          username: z.string(),
          bio: z.string().optional(),
          ufid: z.string().optional(),
          discord: z.string().optional(),
          roles: z.string().optional(),
          email: z.string().optional(),
        }),
      );

      updateProfile({
        username: response.data.username,
        bio: response.data.bio,
        ufid: response.data.ufid,
        discord: response.data.discord,
        roles: response.data.roles,
        email: response.data.email,
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="w-3/4 rounded-2xl bg-white px-10 py-6 shadow-xl">
      <div className="mb-6 flex flex-row justify-between font-redhat">
        <p className="text-xl font-bold">User Info</p>
        <button className="flex flex-row gap-2 hover:scale-105" onClick={() => setEditMode(true)}>
          <Icon icon="material-symbols:edit" width="24" height="24" color="#0668B3" />
          <p className="font-semibold text-saseBlue">Edit</p>
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/3">
          {[
            { label: "Name", name: "name" },
            { label: "UFID", name: "ufid" },
            { label: "Bio", name: "bio" },
            { label: "Discord", name: "discord" },
            { label: "Roles", name: "roles" },
          ].map(({ label, name }) => (
            <div key={name} className="mb-4 flex flex-col gap-2">
              <p className="pl-2">{label}:</p>
              <input
                type="text"
                name={name}
                value={userInfo[name as keyof typeof userInfo] || ""}
                onChange={handleInputChange}
                placeholder={`[${label}]`}
                className="rounded-md border border-black bg-gray-300 p-2"
                disabled={!editMode}
              />
            </div>
          ))}
        </div>

        <div className="mr-10 w-1/3">
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Email:</p>
            <input
              type="text"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder="[Email]"
              className="rounded-md border border-black bg-gray-300 p-2"
              disabled={!editMode}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <p>Password:</p>
            <p>[•••••••••••]</p>
            <p className="text-saseBlue">2FA to reset password</p>
          </div>

          <div className="relative flex h-1/4 w-1/2 items-center justify-center rounded-full bg-saseBlue">
            <Icon icon="mdi:account" className="text-7xl text-saseGreen" />
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 transform rounded-full p-2">
              <Icon icon="mdi:upload" className="text-5xl text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="rounded-md border border-black bg-gray-300 px-4 py-2 font-semibold hover:scale-105 disabled:opacity-50"
          onClick={handleSave}
          disabled={!editMode}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserInfoBox;
