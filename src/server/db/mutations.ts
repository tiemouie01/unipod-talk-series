import type { CreateEventValues } from "@/types/events";
import { db } from ".";
import { event, seat } from "./schema";

export const createEvent = async function (values: CreateEventValues) {
  
  try {
    const eventTransactiondata = await db.transaction(async(tx)=>{
        const eventData = await tx
          .insert(event)
          .values({
            title: values.title,
            description: values.description,
            location: values.location,
            eventDate: new Date(values.eventDate),
            registrationStartDate: new Date(values.registrationStartDate),
            registrationEndDate: new Date(values.registrationEndDate),
            bannerURL: values.bannerURL,
            luckyDrawEnabled: values.luckyDrawEnabled,
            createdBy: values.createdBy,
          })
          .returning();
          if(!eventData){
            tx.rollback()
            throw new Error("An error occrued while creating an event");
          }
          const seats = Array.from({length:Number(values.totalSeats)},(_,i)=>({
            eventId:eventData[0]!.id,
            seatLabel:(i+1).toString(),
            isLuckyDraw:false,
            isReserved:false,
          }))
          await tx.insert(seat).values(seats)
          return eventData[0];
    })
    return eventTransactiondata
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "an unknown error occured while creating an event",
    );
    throw new Error("An error occrued while creating an event");
  }
};
