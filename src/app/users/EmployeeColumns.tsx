"use client";

import { createColumnHelper } from "@tanstack/react-table";
// import { deleteUser } from "./page";

export type Employee = {
  id: string;
  username: string;
  email: string;
  level: number;
  hqsid: string;
};

const columnHelper = createColumnHelper<Employee>();

export const defaultColumns = [
  columnHelper.accessor("hqsid", {
    header: () => "HQS ID",
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
  }),
  columnHelper.display({
    id: "More",
    cell: ({ row }) => {
      const serverId = row.original.id;
      return (
        <button
          onClick={() => console.log(serverId)}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className=' bg-black h-4 w-4' />
        </button>
      );
    },
  }),
];
