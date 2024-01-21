import ShiftCalendar from "@/components/Calendar";
import { getClocks } from "@/lib/data";

export default async function Page() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/login");
  if (!session.user.email_verified) redirect("/");

  const clocks = await getClocks(session.user.hqsID);
  clocks.forEach((clock) => {
    clock.start = new Date(shift.start_datetime);
    clock.end = new Date(shift.end_datetime);
  });
  
  return (
    <>
      <ShiftCalendar shifts={clocks} />
    </>
  );
}
