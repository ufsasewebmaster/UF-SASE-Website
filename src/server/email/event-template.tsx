import React from "react";
import { string } from "zod";

interface EventTemplateProps {
  firstName: string;
}

export const EventTemplate: React.FC<Readonly<EventTemplateProps>> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
