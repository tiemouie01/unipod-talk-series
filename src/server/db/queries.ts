"use server";

import { and, asc, eq,  ilike } from "drizzle-orm";
import { db } from ".";
import { event, luckyDrawWinners, reservation, seat, user } from "./schema";

// const today = new Date();

export const getReservedSeatsForEvent =
  async function fetchesAllReservedSeatsForAParticularEvent({
    eventId,
  }: {
    eventId: string;
  }) {
    try {
      const reservedSeats = await db
        .select()
        .from(seat)
        .where(and(eq(seat.eventId, eventId), eq(seat.isReserved, true)));
      return { reservedSeats, error: null };
    } catch (error) {
      return {
        reservedSeats: null,
        error:
          error instanceof Error
            ? error.message
            : "an unknown error occured while fetching reserved seats",
      };
    }
  };

export const getAllSeatsForEvent =
  async function fetchesAllSeatsForAParticularEvent({
    eventId,
  }: {
    eventId: string;
  }) {
    try {
      const allSeats = await db
        .select()
        .from(seat)
        .where(eq(seat.eventId, eventId));
      return { allSeats, error: null };
    } catch (error) {
      return {
        allSeats: null,
        error:
          error instanceof Error
            ? error.message
            : "an unknown error occured while fetching all seats",
      };
    }
  };

export const getEvents = async ({query}: {query?: string}) => {
  try {
    const eventsData = await db
      .select()
      .from(event)
      .where(ilike(event.title, `%${query}%`))
      .orderBy(asc(event.eventDate));
    const formattedEventData = await Promise.all(
      eventsData.map(async (event) => {
        const [reservedSeats, allSeats] = await Promise.all([
          getReservedSeatsForEvent({ eventId: event.id }),
          getAllSeatsForEvent({ eventId: event.id }),
        ]);

        return {
          ...event,
          reservedSeats: reservedSeats.reservedSeats?.length,
          totalSeats: allSeats.allSeats?.length,
        };
      }),
    );
    return { eventsData: formattedEventData, error: null };
  } catch (error) {
    return {
      eventsData: null,
      error:
        error instanceof Error
          ? error.message
          : "an unknown error occured while fetching events",
    };
  }
};

export const getEventById = async ({ eventId }: { eventId: string }) => {
  try {
    const [eventData, reservedSeats, allSeats] = await Promise.all([
      db.select().from(event).where(eq(event.id, eventId)),
      getReservedSeatsForEvent({ eventId }),
      getAllSeatsForEvent({ eventId }),
    ]);
    if (!eventData || !reservedSeats || !allSeats) {
      throw new Error("an unknown error occured while fetching event by id");
    }
    return {
      eventData: {
        ...eventData[0],
        reservedSeats: reservedSeats.reservedSeats?.length,
        totalSeats: allSeats.allSeats?.length,
      },
      error: null,
    };
  } catch (error) {
    return {
      eventData: null,
      error:
        error instanceof Error
          ? error.message
          : "an unknown error occured while fetching event by id",
    };
  }
};

export const getReservationsForEvent = async function getReservationsForAnEventWithSpecifiedEventID({eventId, query}: {eventId: string, query: string}) {
  try {
    const reservations = await db.select({
      attendeeId:user.id,
      name:user.name,
      email:user.email,
      registeredAt:reservation.createdAt,
      status:reservation.status
    }).from(reservation).where(and(eq(reservation.eventId, eventId), ilike(user.name,query))).innerJoin(user, eq(reservation.userId, user.id));
    return { reservations, error: null };
  } catch (error) {
    console.error(error instanceof Error ? error.message : "An unknown error occured while fetching reservations")
    return {
      reservations: null,
      error:
        error instanceof Error
          ? error.message
          : "an unknown error occured while fetching reservations",
    };
  }
}

export const getLuckyDrawWinnersForEvent = async function getLuckyDrawWinnersForAnEventWithSpecifiedEventID({eventId}: {eventId: string}) {
  try {
    const luckyDrawWinnersData = await db.select({
      userId:user.id,
      name:user.name,
      email:user.email,
      drawAt:luckyDrawWinners.createdAt,
    }).from(luckyDrawWinners).where(eq(luckyDrawWinners.eventId, eventId)).innerJoin(user, eq(luckyDrawWinners.userId, user.id))
    return { luckyDrawWinnersData, error: null };
  } catch (error) {
    console.error(error instanceof Error ? error.message : "An unknown error occured while fetching lucky draw winners")
    return {
      luckyDrawWinnersData: null,
      error:
        error instanceof Error
          ? error.message
          : "an unknown error occured while fetching lucky draw winners",
    };
  }
}
