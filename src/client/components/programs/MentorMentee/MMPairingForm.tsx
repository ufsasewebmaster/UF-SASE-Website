import { addMentorMenteeInvite, addMentorMenteeRelation, getAllMentees, getAllMentors } from "@/client/api/mentorMentee";
import type { Mentee, Mentor } from "@/shared/schema";
import { useAuth } from "@hooks/AuthContext";
import { useEffect, useState } from "react";
import AddPairingButton from "./AddPairingButton";
import type { Option } from "./SearchableSelect";
import SearchableSelect from "./SearchableSelect";

export default function MMPairingForm() {
  const { id, isAdmin } = useAuth();
  const [mode, setMode] = useState<"mentor" | "mentee">("mentor");
  const [mentors, setMentors] = useState<Array<Mentor>>([]);
  const [mentees, setMentees] = useState<Array<Mentee>>([]);
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMentors().then(setMentors);
    getAllMentees().then(setMentees);
  }, []);

  useEffect(() => {
    if (!isAdmin && id) {
      if (mode === "mentor") setMenteeId(id);
      else setMentorId(id);
    }
  }, [isAdmin, id, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorId || !menteeId) return;
    setLoading(true);
    try {
      if (isAdmin) {
        await addMentorMenteeRelation(mentorId, menteeId);
        alert("Relationship added!");
        setMentorId("");
        setMenteeId("");
      } else {
        await addMentorMenteeInvite(mentorId, menteeId);
        alert("Invite sent!");
      }
    } catch (err) {
      alert("Failed: " + err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "mentor" ? "mentee" : "mentor"));
  };

  const realMentorOptions: Array<Option> = mentors.map((m) => ({
    value: m.mentorId,
    label: `${m.firstName} ${m.lastName}`,
  }));
  const realMenteeOptions: Array<Option> = mentees.map((m) => ({
    value: m.menteeId,
    label: `${m.firstName} ${m.lastName}`,
  }));

  const mentorOptions = !isAdmin && mode === "mentee" && id ? [{ value: id, label: "You" }, ...realMentorOptions] : realMentorOptions;

  const menteeOptions = !isAdmin && mode === "mentor" && id ? [{ value: id, label: "You" }, ...realMenteeOptions] : realMenteeOptions;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6 p-4">
      <div className="flex items-center gap-4">
        {/* Mentor */}
        <div className="flex-1">
          <label className="mb-1 block">Select Mentor</label>
          <SearchableSelect
            className="w-[172px] transition-opacity duration-200 disabled:opacity-50"
            options={mentorOptions}
            value={mentorId}
            onChange={setMentorId}
            disabled={!isAdmin && mode === "mentee"}
            placeholder="Choose a mentor…"
          />
        </div>

        {/* Switch */}
        {!isAdmin && (
          <button
            type="button"
            onClick={toggleMode}
            aria-label="Toggle mentor/mentee"
            className="relative inline-flex h-6 w-12 cursor-pointer rounded-full border-2 border-gray-300 bg-gray-200 transition-colors duration-200"
          >
            <span
              className={
                "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 " +
                (mode === "mentee" ? "translate-x-6" : "translate-x-0")
              }
            />
          </button>
        )}

        {/* Mentee */}
        <div className="flex-1">
          <label className="mb-1 block">Select Mentee</label>
          <SearchableSelect
            className="w-[172px] transition-opacity duration-200 disabled:opacity-50"
            options={menteeOptions}
            value={menteeId}
            onChange={setMenteeId}
            disabled={!isAdmin && mode === "mentor"}
            placeholder="Choose a mentee…"
          />
        </div>
      </div>

      {/* centered submit */}
      <div className="flex justify-center">
        <AddPairingButton loading={loading} disabled={!mentorId || !menteeId} text={isAdmin ? "Add Pairing" : "Request Pairing"}>
          {" "}
        </AddPairingButton>
      </div>
    </form>
  );
}
