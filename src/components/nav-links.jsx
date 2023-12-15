"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard" },
  { name: "Calendar", href: "/dashboard/calendar" },
  { name: "Requests", href: "/dashboard/requests" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ name, href }) => (
        <Link key={name} href={href} className={clsx(
          "flex hover:bg-sky-950 hover:text-neutral-50 px-3 py-2 rounded-md text-sm font-medium text-neutral-100",
          {
            "bg-sky-950 text-neutral-50": pathname === href,
          }
        )}>
          <p>{name}</p>
        </Link>
      ))}
    </>
  );
}
