import { Button } from "@components/ui/button";

interface AccountBoxProps {
  handleLogout: () => void;
  username: string;
}

const AccountBox: React.FC<AccountBoxProps> = ({ handleLogout, username }) => {
  return (
    <div className="group min-h-[500px] w-3/4 rounded-2xl bg-white px-10 py-6 shadow-xl">
      <h1 className="relative mb-10 text-5xl font-bold leading-tight text-gray-800">
        Welcome,{" "}
        <span className="relative inline-block leading-tight">
          <span className="absolute inset-0 bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0">
            {username}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-saseBlue to-saseGreen bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {username}
          </span>
          <span className="invisible block">{username}</span>
        </span>
        !
      </h1>
      <p className="mb-10 text-2xl text-gray-600">
        This is your account dashboard. Here you can manage your user info, security details, and settings.
      </p>
      <div className="mt-10 flex justify-center">
        <Button
          variant="destructive"
          className="mt-4 rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AccountBox;
