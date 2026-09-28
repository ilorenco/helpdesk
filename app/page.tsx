import { redirect } from "next/navigation";

// Until authentication exists, the entry point is the sign-in screen; afterwards it will send
// each signed-in user to their role's area
export default function Home() {
    redirect("/sign-in");
}
