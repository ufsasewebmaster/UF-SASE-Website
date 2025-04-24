// src/routes/profile/security.tsx
import SecurityBox from "@components/profile/SecurityBox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/security")({
  component: () => <SecurityBox />,
});
