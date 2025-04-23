import { useAuth } from "@/client/hooks/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authed")({
  component: AuthedComponent,
});

function AuthedComponent() {
  const { isAdmin, isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <div>
      <div>Helllllllo</div>
      {isAuthenticated ? <div>Hello, you are indeed authenticated</div> : <div>Sorry, you are not authenticated</div>}
      {isAdmin ? <div>You are an admin</div> : <div>You are not an admin</div>}
    </div>
  );
}
