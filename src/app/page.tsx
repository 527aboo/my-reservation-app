import { User } from "@/types/type";
import ReservationForm from "./components/reservation/ReservationForm";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/option";

export default async function Home() {

  const session = await getServerSession(nextAuthOptions);
  const user: User = session?.user as User;

  return (
      <ReservationForm user={user} />
  )
}
