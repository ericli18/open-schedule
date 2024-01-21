"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Clock = {
  hqsid: string
  date: string
  type: "PUNCH_IN" | "PUNCH_OUT" | "LUNCH_IN" | "LUNCH_OUT"
}

export const columns: ColumnDef<Clock>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  }
]
