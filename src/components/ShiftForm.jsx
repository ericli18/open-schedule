"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  startDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid start date format.",
  }),

  startTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid start time format. Use HH:mm (24-hour format).",
  }),

  endDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid end date format.",
    }),
    

  endTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid end time format. Use HH:mm (24-hour format).",
  }),

  headcount: z
    .number()
    .int()
    .min(1, { message: "Headcount must be at least 1." }),

  repeat: z.enum(["none", "daily", "weekly", "monthly", "custom"]),
})
.refine(
  (data) => {
    const startDate = data.startDate;
    return !startDate || data.endDate >= startDate;
  },
  {
    message: "End date must be greater than or equal to the start date.",
  }
);

export default function ShiftForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      headcount: 1,
      repeat: "none",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='shift 1' {...field} />
              </FormControl>
              <FormDescription>
                The title of the shift, e.g. "Shift 1"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormDescription>The date the shift starts.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type='time' {...field} />
              </FormControl>
              <FormDescription>The time the shift starts.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormDescription>The date the shift ends.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type='time' {...field} />
              </FormControl>
              <FormDescription>The time the shift ends.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='headcount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headcount</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                The number of people needed for this shift.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='repeat'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='How often this event repeats' />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value='none'>None</SelectItem>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='weekly'>Weekly</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                  <SelectItem value='custom'>Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>How often this shift repeats.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
