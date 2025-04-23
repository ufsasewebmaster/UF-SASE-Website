import { Button } from "@components/ui/button";
import { useTimer } from "@hooks/useTimer";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

//import { toast } from "react-hot-toast";

interface AccountBoxProps {
  handleLogout: () => void;
  handleUpdate: () => void;
  username: string;
  email: string;
  bio: string;
}

type Inputs = {
  username: string;
  email: string;
  bio: string;
  password: string;
};

interface SelectedFields {
  username?: string;
  email?: string;
  bio?: string;
}

const AccountBox: React.FC<AccountBoxProps> = ({ bio, email, handleLogout, handleUpdate, username }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      const fields: SelectedFields = initializeInterface(data.username, data.email, data.bio);
      fetch("api/profile", {
        method: "PATCH",
        body: JSON.stringify(fields),
      });
      handleUpdate();
    } catch {
      console.log("Updating profile info from account box failed");
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const { seconds, startTimer, timerRunning } = useTimer();

  useEffect(() => {
    setValue("username", username);
    setValue("email", email);
    setValue("bio", bio);
  }, [bio, email, username]);

  const initializeInterface = (username?: string, email?: string, bio?: string): SelectedFields => {
    const fields: SelectedFields = {};
    if (username && username != "") fields.username = username;
    if (email && email != "") fields.email = email;
    if (bio && bio != "") fields.bio = bio;
    return fields;
  };

  const passwordResetHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    //does nothing if timer is running (reset email has already been sent)
    if (!timerRunning) {
      try {
        fetch("api/email/password-reset", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        startTimer(10);
      } catch (error) {
        console.log("Password reset email could not be sent", error);
      }
    }
  };

  return (
    <div className="group min-h-[500px] w-3/4 rounded-2xl bg-background px-10 py-6 shadow-xl">
      <h1 className="relative mb-10 text-5xl font-bold leading-tight text-foreground">
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

      <p className="mb-10 text-2xl text-foreground">This is your account dashboard. Here you can manage your security details and settings.</p>
      <div className="col-span-2">
        <h2 className="mb-4 text-2xl font-semibold text-saseGreen">Account Information</h2>
        {/*User Data Form*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Username</label>
              {isEditing ? (
                <div>
                  <input {...register("username")} defaultValue={username} className="w-full rounded-lg border px-4 py-2" disabled={!isEditing} />
                  {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
                </div>
              ) : (
                <p className="rounded-lg bg-gray-50 px-4 py-2">{username}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              {isEditing ? (
                <div>
                  <input {...register("email")} defaultValue={email} className="w-full rounded-lg border px-4 py-2" disabled={!isEditing} />
                  {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                </div>
              ) : (
                <p className="rounded-lg bg-gray-50 px-4 py-2">{email}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <p className="rounded-lg bg-gray-50 px-4 py-2">••••••••</p>
              {isEditing && (
                <a href="#" onClick={passwordResetHandler} className="text-sm text-blue-600 hover:underline">
                  {timerRunning ? `Reset Email Sent! Please wait ${seconds} seconds to try again.` : "Send Password Reset Email"}
                </a>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Bio</label>
              {isEditing ? (
                <div>
                  <input {...register("bio")} defaultValue={bio} className="w-full rounded-lg border px-4 py-2" disabled={!isEditing} />
                  {errors.bio && <span className="text-sm text-red-500">{errors.bio.message}</span>}
                </div>
              ) : (
                <p className="rounded-lg bg-gray-50 px-4 py-2">{bio}</p>
              )}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Button type="button" onClick={() => setIsEditing(!isEditing)}>
              <Icon icon="material-symbols:edit" width="24" height="24" color="#FFFFFF" />
              Toggle Editing
            </Button>
            {isEditing && (
              <div className="pl-4">
                <Button type="submit">
                  <Icon icon="material-symbols:save" width="24" height="24" color="#FFFFFF" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
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
