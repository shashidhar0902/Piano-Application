import { createFileRoute } from "@tanstack/react-router";
import { ClefringApp } from "@/components/ClefringApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ClefringApp />;
}
