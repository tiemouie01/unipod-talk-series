"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { reservationFormSchema } from "@/lib/form-schemas";
import type { ReservationFormValues } from "@/lib/form-schemas";
import { createReservationAction } from "@/server/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface SeatOption {
  id: string;
  label: string;
}

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  // For now, pass available seats as prop (should be fetched server-side in real app)
  availableSeats?: SeatOption[];
}

export function ReservationModal({
  open,
  onOpenChange,
  eventId,
  availableSeats = [],
}: ReservationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      occupation: "",
      seatId: undefined,
    },
  });
  const { handleSubmit, reset } = form;

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createReservationAction({ ...data, eventId });
      if (result?.error) {
        toast.error("Reservation Failed", {
          description:
            typeof result.error === "string"
              ? result.error
              : "Please check your input.",
        });
      } else {
        toast.success("Reservation Confirmed!", {
          description:
            "Your seat has been reserved. Check your email for confirmation details.",
        });
        onOpenChange(false);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Reservation Failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reserve Your Seat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input id="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input id="occupation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seatId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seat Selection</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a seat" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSeats.length === 0 ? (
                          <SelectItem value="" disabled>
                            No seats available
                          </SelectItem>
                        ) : (
                          availableSeats.map((seat) => (
                            <SelectItem key={seat.id} value={seat.id}>
                              {seat.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting ? "Reserving..." : "Reserve Seat"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
