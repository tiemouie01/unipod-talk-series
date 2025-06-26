import Image from "next/image";
import { CreateEventForm } from "./_components/create-event-form";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 lg:p-8">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/unipod_banner.jpg"
          alt="UniPod Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/90 to-blue-950/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <CreateEventForm />
      </div>
    </div>
  );
}