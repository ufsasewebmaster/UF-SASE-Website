import { Icon } from "@iconify/react";
import { useState } from "react";

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

const createInterface = (name?: string, majors?: string, minors?: string, discord?: string, linkedin?: string, roles?: string): updateFields => {
  //conditionally initializes interface fields
  const names = name?.split(" ", 2);
  const fields: updateFields = {};
  if (names?.[0] != undefined && names[0] != "") {
    fields.first_name = names[0];
  }
  if (names?.[1] != undefined && names[1] != "") {
    fields.last_name = names[1];
  }
  if (majors != undefined && majors != "") fields.majors = majors;
  if (minors != undefined && minors != "") fields.minors = minors;
  if (discord != undefined && discord != "") fields.discord = discord;
  if (linkedin != undefined && linkedin != "") fields.linkedin = linkedin;
  if (roles != undefined && roles != "") fields.roles = roles;
  return fields;
};

const UserInfoBox: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [majorsInput, setMajorsInput] = useState("");
  const [minorsInput, setMinorsInput] = useState("");
  const [discordInput, setDiscordInput] = useState("");
  const [linkedinInput, setLinkedinInput] = useState("");
  const [rolesInput, setRolesInput] = useState("");

  const resetInputs = () => {
    setNameInput("");
    setMajorsInput("");
    setMinorsInput("");
    setDiscordInput("");
    setLinkedinInput("");
    setRolesInput("");
  };

  const HandleSaveButtonClicked = () => {
    setEditMode(false);
    try {
      const updatedFields = createInterface(nameInput, majorsInput, minorsInput, discordInput, linkedinInput, rolesInput);
      fetch("api/profile", {
        method: "PATCH",
        body: JSON.stringify(updatedFields),
      });
      resetInputs();
    } catch {
      console.log("Profile couldn't be updated from user info box");
    }
  };

  return (
    <div className="w-3/4 rounded-2xl bg-background px-10 py-6 shadow-xl">
      {/* Header */}
      <div className="mb-6 flex flex-row justify-between font-redhat">
        <p className="text-xl font-bold">User Info</p>
        <button className="flex flex-row gap-2 hover:scale-105" onClick={() => setEditMode(!editMode)}>
          <Icon icon="material-symbols:edit" width="24" height="24" color="#0668B3" />
          <p className="font-semibold text-saseBlue">Edit</p>
        </button>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="pl-2">Name:</label>
            <input
              type="text"
              placeholder="[First_Last]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="pl-2">majors(s):</label>
            <input
              type="text"
              placeholder="[Enter your majors(s)]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={majorsInput}
              onChange={(e) => setMajorsInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="pl-2">minors(s):</label>
            <input
              type="text"
              placeholder="[Enter your minors(s)]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={minorsInput}
              onChange={(e) => setMinorsInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="pl-2">LinkedIn:</label>
            <input
              type="text"
              placeholder="[Enter LinkedIn profile URL]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={linkedinInput}
              onChange={(e) => setLinkedinInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="pl-2">Discord:</label>
            <input
              type="text"
              placeholder="[Enter your Discord Username]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={discordInput}
              onChange={(e) => setDiscordInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="pl-2">Roles:</label>
            <input
              type="text"
              placeholder="[Ex. Webdev member, Interns]"
              className={`rounded-md border border-black p-2 ${editMode ? "bg-white" : "bg-gray-300"}`}
              value={rolesInput}
              onChange={(e) => setRolesInput(e.target.value)}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="rounded-md border border-black bg-gray-300 px-4 py-2 font-semibold hover:scale-105" onClick={HandleSaveButtonClicked}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserInfoBox;
