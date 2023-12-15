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
          "bg-gray-50",
          {
            "bg-gray-100": pathname === href,
          }
        )}>
          <p>{name}</p>
        </Link>
      ))}
    </>
  );
}
