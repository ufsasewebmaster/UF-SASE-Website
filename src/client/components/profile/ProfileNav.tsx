import { cn } from "@/shared/utils";
import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";

const SASE_COLORS = ["saseBlue", "saseGreen"];

interface ProfileNavProps {
  profileName?: string;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ profileName = "User" }) => {
  return (
    <div className={cn("flex w-60 flex-col rounded-3xl bg-white p-6 font-redhat shadow-lg")}>
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
          { icon: "mdi:account-circle-outline", text: "Account", to: "/" },
          { icon: "mdi:information-outline", text: "User Info", to: "/" },
          { icon: "mdi:lock-outline", text: "Security", to: "/" },
          { icon: "mdi:clipboard-check-outline", text: "Attendance", to: "/" },
          { icon: "mdi:file-document-outline", text: "Forms", to: "/" },
          { icon: "mdi:book-open-page-variant-outline", text: "Resources", to: "/" },
          { icon: "mdi:cog-outline", text: "Settings", to: "/" },
        ].map((item, idx) => (
          <NavItem key={idx} icon={item.icon} text={item.text} to={item.to} color={SASE_COLORS[idx % 2]} />
        ))}
      </nav>
    </div>
  );
};

const NavItem = ({ color, icon, text, to }: { icon: string; text: string; to: string; color: string }) => (
  <Link
    to={to}
    className={cn(
      "group relative flex items-center space-x-3 rounded-md p-3 text-left font-redhat transition-transform duration-300 hover:scale-105",
    )}
  >
    <Icon
      icon={icon}
      className={cn(
        "text-3xl text-black transition-colors duration-300",
        color === "saseBlue" ? "group-hover:text-saseBlue" : "group-hover:text-saseGreen",
      )}
    />
    <div className="relative">
      <span
        className={cn(
          "font-medium text-black transition-all duration-300 group-hover:font-bold",
          color === "saseBlue" ? "group-hover:text-saseBlue" : "group-hover:text-saseGreen",
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full",
          color === "saseBlue" ? "group-hover:bg-saseBlue" : "group-hover:bg-saseGreen",
        )}
      ></span>
    </div>
  </Link>
);

export default ProfileNav;
