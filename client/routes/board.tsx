import { createFileRoute } from "@tanstack/react-router";
import Board from "../components/Board";

export const Route = createFileRoute("/board")({
  component: Board,
});
