import { cn } from "@/shared/utils";
import { Icon } from "@iconify/react";

const SASE_COLORS = ["saseBlue", "saseGreen"];

interface ProfileNavProps {
  activeSection: string;
  profileName?: string;
  update: (section: string) => void;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ activeSection, profileName = "User", update }) => {
  return (
    <div className={cn("flex w-60 flex-col rounded-3xl bg-background p-6 font-redhat shadow-xl")}>
      {/* Profile Info */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className={cn("flex h-36 w-36 items-center justify-center rounded-full bg-saseBlueLight text-white")}>
          <span className="text-4xl font-bold">{profileName?.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold">{profileName}</h2>
        <p className="text-med italic text-gray-500">ex: SASE President</p>
        <p className="text-med italic text-gray-500">Bio: [Short sentence]</p>
      </div>

      <nav className="flex flex-col space-y-2">
        {[
          { icon: "mdi:account-circle-outline", text: "Account" },
          { icon: "mdi:information-outline", text: "User Info" },
          { icon: "mdi:lock-outline", text: "Security" },
          { icon: "mdi:cog-outline", text: "Settings" },
        ].map((item, idx) => (
          <NavItem
            key={idx}
            icon={item.icon}
            text={item.text}
            color={SASE_COLORS[idx % 2]}
            update={update}
            isActive={activeSection === item.text.toLowerCase().replace(/\s+/g, "")}
          />
        ))}
      </nav>
    </div>
  );
};

interface NavItemProps {
  color: string;
  icon: string;
  isActive: boolean;
  text: string;
  update: (section: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ color, icon, isActive, text, update }) => {
  const setActiveSection = () => {
    const section = text.toLowerCase().replace(/\s+/g, "");
    update(section);
  };

  return (
    <button
      className={cn(
        "group relative flex items-center space-x-3 rounded-md p-3 text-left font-redhat transition-transform duration-300",
        isActive ? "scale-105" : "hover:scale-105",
      )}
      onClick={setActiveSection}
    >
      <Icon
        icon={icon}
        className={cn(
          "text-3xl transition-colors duration-300",
          isActive
            ? color === "saseBlue"
              ? "text-saseBlue"
              : "text-saseGreen"
            : color === "saseBlue"
              ? "group-hover:text-saseBlue"
              : "group-hover:text-saseGreen",
        )}
      />
      <div className="relative">
        <span
          className={cn(
            "font-medium transition-all duration-300",
            isActive
              ? color === "saseBlue"
                ? "font-bold text-saseBlue"
                : "font-bold text-saseGreen"
              : color === "saseBlue"
                ? "group-hover:text-saseBlue"
                : "group-hover:text-saseGreen",
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300",
            isActive
              ? color === "saseBlue"
                ? "w-full bg-saseBlue"
                : "w-full bg-saseGreen"
              : color === "saseBlue"
                ? "group-hover:w-full group-hover:bg-saseBlue"
                : "group-hover:w-full group-hover:bg-saseGreen",
          )}
        ></span>
      </div>
    </button>
  );
};

export default ProfileNav;
