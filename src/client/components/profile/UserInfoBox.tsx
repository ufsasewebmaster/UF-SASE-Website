import AvatarEdit from "@assets/AvatarEdit.png";
import EditIcon from "@assets/EditIcon.png";
import { Icon } from "@iconify/react";
import { useState } from "react";

const UserInfoBox = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="w-3/4 rounded-2xl border border-black bg-white px-10 py-6">
      <div className="mb-6 flex flex-row justify-between font-redhat">
        <p className="font-redhat text-xl font-bold">User Info</p>
        <button className="flex flex-row gap-2 hover:scale-105" onClick={() => setEditMode(true)}>
          <Icon icon="material-symbols:edit" width="24" height="24" color="#0668B3" />
          <p className="font-semibold text-saseBlue">Edit</p>
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/3">
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Name:</p>
            <input type="text" placeholder="[First_Last]" className="rounded-md border border-black bg-gray-300 p-2" disabled={!editMode} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">UFID:</p>
            <input type="text" placeholder="[UFID]" className="rounded-md border border-black bg-gray-300 p-2" disabled={!editMode} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Bio:</p>
            <input type="text" placeholder="[Bio]" className="rounded-md border border-black bg-gray-300 p-2" disabled={!editMode} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Discord:</p>
            <input type="text" placeholder="[Discord_Username]" className="rounded-md border border-black bg-gray-300 p-2" disabled={!editMode} />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Roles:</p>
            <input
              type="text"
              placeholder="[Ex. Webdev member, Interns]"
              className="rounded-md border border-black bg-gray-300 p-2"
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="mr-10 w-1/3">
          <div className="mb-4 flex flex-col gap-2">
            <p className="pl-2">Email:</p>
            <input type="text" placeholder="[Email]" className="rounded-md border border-black bg-gray-300 p-2" disabled={!editMode} />
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
        <button className="rounded-md border border-black bg-gray-300 px-4 py-2 font-semibold hover:scale-105" onClick={() => setEditMode(false)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserInfoBox;
