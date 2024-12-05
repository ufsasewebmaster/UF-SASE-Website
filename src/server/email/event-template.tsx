import React from "react";

interface EventTemplateProps {
  firstName: string;
}

export const EventTemplate: React.FC<Readonly<EventTemplateProps>> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
