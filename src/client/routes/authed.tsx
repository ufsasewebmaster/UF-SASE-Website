import { useAuth } from "@/client/hooks/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authed")({
  component: AuthedComponent,
});

function AuthedComponent() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <div>
      <div>Helllllllo</div>
      {isAuthenticated ? <div>Hellllllllo, you are indeed authenticated</div> : <div>Sorry, you are not authenticated</div>}
    </div>
  );
}
