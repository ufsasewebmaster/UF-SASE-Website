import { Icon } from "@iconify/react";

const ProfileNav = () => {
  return (
    <div className="flex w-64 flex-col rounded-lg bg-white p-4 shadow-md">
      {/* Profile Info */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
          <Icon icon="mdi:account" className="text-4xl text-gray-500" />
        </div>
        <h2 className="mt-2 text-lg font-semibold">[NAME]</h2>
        <p className="text-sm text-gray-500">UFID: [UFID]</p>
        <p className="text-sm italic text-gray-500">ex: SASE President</p>
        <p className="text-sm italic text-gray-500">Bio: [Short sentence]</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1">
        <NavItem icon="mdi:account-circle-outline" text="Account" />
        <NavItem icon="mdi:information-outline" text="User Info" />
        <NavItem icon="mdi:lock-outline" text="Security" />
        <NavItem icon="mdi:clipboard-check-outline" text="Attendance" />
        <NavItem icon="mdi:file-document-outline" text="Forms" />
        <NavItem icon="mdi:book-open-page-variant-outline" text="Resources" />
        <NavItem icon="mdi:cog-outline" text="Settings" />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, text }: { icon: string; text: string }) => (
  <button className="flex items-center space-x-3 rounded-md p-3 text-left transition hover:bg-gray-100">
    <Icon icon={icon} className="text-xl text-gray-600" />
    <span className="font-medium text-gray-700">{text}</span>
  </button>
);

export default ProfileNav;
