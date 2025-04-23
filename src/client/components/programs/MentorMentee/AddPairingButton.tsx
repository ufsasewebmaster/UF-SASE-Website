// components/AddPairingButton.tsx
import { Button } from "@ui/button";
import React from "react";

interface AddPairingButtonProps {
  loading: boolean;
  disabled: boolean;
}

const AddPairingButton: React.FC<AddPairingButtonProps> = ({ loading, disabled }) => (
  <Button type="submit" disabled={disabled || loading} variant="default" className="rounded bg-saseGreen px-4 py-2 text-white disabled:opacity-50">
    {loading ? "Adding…" : "Add Pairing"}
  </Button>
);

export default AddPairingButton;
