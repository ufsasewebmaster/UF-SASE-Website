import { addMentorMenteeRelation, getAllMentees, getAllMentors } from "@client/api/mentorMentee";
import type { Mentee, Mentor } from "@shared/schema";
import { useEffect, useState } from "react";
import AddPairingButton from "./AddPairingButton";
import SearchableSelect, { Option } from "./SearchableSelect";

export default function MMPairingForm() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllMentors().then(setMentors);
    getAllMentees().then(setMentees);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mentorId || !menteeId) return;
    setLoading(true);

    try {
      await addMentorMenteeRelation(mentorId, menteeId);
      alert("Relationship added!");
      setMentorId("");
      setMenteeId("");
    } catch (err: any) {
      console.error(err);
      alert("Failed to add: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Build react-select options
  const mentorOptions: Option[] = mentors.map((m) => ({
    value: m.mentorId,
    label: `${m.firstName} ${m.lastName}`,
  }));
  const menteeOptions: Option[] = mentees.map((m) => ({
    value: m.menteeId,
    label: `${m.firstName} ${m.lastName}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6 p-4">
      {/* Mentor Dropdown */}
      <div>
        <label className="mb-1 block font-medium">Select Mentor</label>
        <SearchableSelect options={mentorOptions} value={mentorId} placeholder="Choose a mentor…" onChange={setMentorId} />
      </div>

      {/* Mentee Dropdown */}
      <div>
        <label className="mb-1 block font-medium">Select Mentee</label>
        <SearchableSelect options={menteeOptions} value={menteeId} placeholder="Choose a mentee…" onChange={setMenteeId} />
      </div>

      {/* Submit Button */}
      <AddPairingButton loading={loading} disabled={!mentorId || !menteeId} />
    </form>
  );
}
