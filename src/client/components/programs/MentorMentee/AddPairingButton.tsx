// components/AddPairingButton.tsx
import { Button } from "@ui/button";
import React from "react";

interface AddPairingButtonProps {
  loading: boolean;
  disabled: boolean;
  children: React.ReactNode;
  text: string;
}

const AddPairingButton: React.FC<AddPairingButtonProps> = ({ disabled, loading, text }) => (
  <Button type="submit" disabled={disabled || loading} variant="default" className="rounded bg-saseGreen px-4 py-2 text-white disabled:opacity-50">
    {loading ? "Adding…" : text}
  </Button>
);

export default AddPairingButton;
