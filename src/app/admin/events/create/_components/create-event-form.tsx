"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { createEventSchema } from "@/validation/events";
import type { CreateEventFormData } from "@/types/events";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { createEventAction } from "@/server/actions";


export function CreateEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      eventDate: "",
      location: "",
      totalSeats: "",
      registrationStartDate: "",
      registrationEndDate: "",
      luckyDrawEnabled: false,
      bannerURL: "",
    },
  });

  const onSubmit = async (data: CreateEventFormData) => {
    setIsSubmitting(true);
    try {
      toast.loading("Creating Event Please Wait")
      const {eventdata, error} = await createEventAction(data)
      if (error) {
        toast.dismiss()
        toast.error(error)
        return
      }
      toast.dismiss()
      toast.success("Event Created Successfully",{
        description:`${eventdata?.title} event was created successfully`
      })
      form.reset();
      setPreviewUrl("")
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          asChild
          variant="ghost"
          className="text-slate-300 hover:bg-blue-900/30 hover:text-blue-400"
        >
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
        <h2 className="bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-2xl font-bold text-transparent">
          Create New Event
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Basic Information */}
            <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Event Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event name"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your event"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Capacity */}
            <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  Location & Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Event location"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Total Seats
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Number of available seats"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bannerURL"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Event Banner
                      </FormLabel>
                      <div className="space-y-4">
                        <UploadButton
                          endpoint={"imageUploader"}
                          onClientUploadComplete={(res) => {
                            if (res[0]?.ufsUrl) {
                              toast.success(
                                "Banner image uploaded successfully.",
                              );
                              form.setValue("bannerURL", res[0].ufsUrl);
                              setPreviewUrl(form.getValues("bannerURL"));
                            }
                          }}
                        />
                        {previewUrl && (
                          <div className="mt-4 overflow-hidden rounded-lg border border-blue-700/50">
                            <Image
                              src={previewUrl}
                              alt="Event banner preview"
                              width={400}
                              height={800}
                              className="h-64 w-full object-cover"
                            />
                          </div>
                        )}
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Registration Settings */}
            <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  Registration Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="registrationStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Registration Opens
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Registration Closes
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="border-blue-700/50 bg-slate-700 text-white focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Lucky Draw Settings */}
            <Card className="border-blue-800/30 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-yellow-400" />
                  Lucky Draw Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="luckyDrawEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-slate-300">
                          Enable Lucky Draw
                        </FormLabel>
                        <FormDescription className="text-sm text-slate-400">
                          Automatically select 6 winners when only 6 seats
                          remain
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("luckyDrawEnabled") && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-400">
                      <strong>Lucky Draw Mode:</strong> When registration
                      reaches capacity minus 6 seats, the system will randomly
                      select 6 winners from the waitlist.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              asChild
              className="border-red-500/50 text-red-300 transition-colors hover:border-red-400 hover:bg-red-950/50 hover:text-red-200"
            >
              <Link href="/events" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-yellow-500 shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-yellow-600 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
