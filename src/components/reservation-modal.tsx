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
import { useRouter } from "next/navigation";

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
}

export function ReservationModal({
  open,
  onOpenChange,
  eventId,
}: ReservationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      occupation: "",
      eventId,
    },
  });
  const router = useRouter();
  const { handleSubmit, reset } = form;

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createReservationAction(data);
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
        router.refresh();
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
      <DialogContent className="border border-white/10 bg-black/60 shadow-none backdrop-blur-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <span className="font-semibold text-white/90">
              Reserve Your Seat
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      className="border border-white/10 bg-black/40 text-white backdrop-blur-md placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/30"
                    />
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
                  <FormLabel className="text-white/80">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      className="border border-white/10 bg-black/40 text-white backdrop-blur-md placeholder:text-gray-400 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/30"
                    />
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
                  <FormLabel className="text-white/80">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      {...field}
                      className="border border-white/10 bg-black/40 text-white backdrop-blur-md placeholder:text-gray-400 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/30"
                    />
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
                  <FormLabel className="text-white/80">Occupation</FormLabel>
                  <FormControl>
                    <Input
                      id="occupation"
                      {...field}
                      className="border border-white/10 bg-black/40 text-white backdrop-blur-md placeholder:text-gray-400 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/30"
                    />
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
                className="flex-1 border border-white/10 bg-black/40 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 border border-blue-400/40 bg-black/60 font-semibold text-blue-200 hover:bg-blue-900/30 hover:text-blue-100"
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
