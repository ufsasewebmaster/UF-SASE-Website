import { Icon } from "@iconify/react";
import { useState } from "react";

interface updateFields {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  discord?: string;
  bio?: string;
  roles?: string;
}

const createInterface = (name?: string, email?: string, username?: string, discord?: string, bio?: string, roles?: string): updateFields => {
  //conditionally initializes interface fields
  const names = name?.split(" ", 2);
  const fields: updateFields = {};
  if (names?.[0] != undefined && names[0] != "") {
    fields.first_name = names[0];
  }
  if (names?.[1] != undefined && names[1] != "") {
    fields.last_name = names[1];
  }
  if (email != undefined && email != "") fields.email = email;
  if (username != undefined && username != "") fields.username = username;
  if (discord != undefined && discord != "") fields.discord = discord;
  if (bio != undefined && bio != "") fields.bio = bio;
  if (roles != undefined && roles != "") fields.roles = roles;
  return fields;
};

const UserInfoBox: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [discordInput, setDiscordInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [rolesInput, setRolesInput] = useState("");

  const resetInputs = () => {
    setNameInput("");
    setUsernameInput("");
    setEmailInput("");
    setDiscordInput("");
    setBioInput("");
    setRolesInput("");
  };

  const HandleSaveButtonClicked = () => {
    setEditMode(false);
    try {
      const updatedFields = createInterface(nameInput, emailInput, usernameInput, discordInput, bioInput, rolesInput);
      fetch("api/profile", {
        method: "PATCH",
        body: JSON.stringify(updatedFields),
      });
      resetInputs();
    } catch {
      console.log("Profile couldn't be updated");
    }
  };

  return (
    <div className="w-3/4 rounded-2xl bg-background px-10 py-6 shadow-xl">
      <div className="mb-6 flex flex-row justify-between font-redhat">
        <p className="font-redhat text-xl font-bold">User Info</p>
        <button className="flex flex-row gap-2 hover:scale-105" onClick={() => setEditMode(!editMode)}>
          <Icon icon="material-symbols:edit" width="24" height="24" color="#0668B3" />
          <p className="font-semibold text-saseBlue">Edit</p>
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/3">
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Name:</p>
            <input
              type="text"
              placeholder="[First_Last]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Username:</p>
            <input
              type="text"
              placeholder="[Username]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Bio:</p>
            <input
              type="text"
              placeholder="[Bio]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Discord:</p>
            <input
              type="text"
              placeholder="[Discord_Username]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              value={discordInput}
              onChange={(e) => setDiscordInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Roles:</p>
            <input
              type="text"
              placeholder="[Ex. Webdev member, Interns]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              value={rolesInput}
              onChange={(e) => setRolesInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="mr-10 w-1/3">
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Email:</p>
            <input
              type="text"
              placeholder="[Email]"
              className={editMode ? "rounded-md border border-black bg-white p-2" : "rounded-md border border-black bg-gray-300 p-2"}
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
              disabled={!editMode}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <p>Password:</p>
            <p>[xxxxxxxxxxx]</p>
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
        <button className="rounded-md border border-black bg-gray-300 px-4 py-2 font-semibold hover:scale-105" onClick={HandleSaveButtonClicked}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserInfoBox;
