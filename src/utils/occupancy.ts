import { colors } from "../theme/theme";
import { Booking, OccupancyLevel, StudySpace } from "../types";

export function occupancyPercent(space: StudySpace): number {
  if (space.seats <= 0) return 0;
  return Math.round((space.occupied / space.seats) * 100);
}

export function occupancyLevel(percent: number): OccupancyLevel {
  if (percent < 50) return "low";
  if (percent <= 80) return "medium";
  return "high";
}

export function occupancyColor(percent: number): string {
  const level = occupancyLevel(percent);
  if (level === "low") return colors.green;
  if (level === "medium") return colors.amber;
  return colors.red;
}

export function occupancyLabel(percent: number): string {
  const level = occupancyLevel(percent);
  if (level === "low") return "Quiet";
  if (level === "medium") return "Busy";
  return "Almost full";
}

export function seatsLeft(space: StudySpace): number {
  return Math.max(space.seats - space.occupied, 0);
}

/** Slots nobody has taken yet. */
export function freeSlots(space: StudySpace): string[] {
  return space.slots.filter((slot) => !space.bookedSlots.includes(slot));
}

/** Used by the "Open now" filter chip (F5). */
export function hasOpenSlot(space: StudySpace): boolean {
  return freeSlots(space).length > 0;
}

/** Short clock for the "Last refreshed" line (F6). */
export function clockLabel(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Time helpers - used by the Smart Conflict Warning enhancement.
// Campus slots run 9am to 6pm, so an hour below 8 means afternoon:
// "1:00-2:00" is 13:00-14:00, not 1am.
// ---------------------------------------------------------------------------

function toMinutes(clock: string): number {
  const [rawHour, rawMinute] = clock.trim().split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute ?? 0);
  const hour24 = hour < 8 ? hour + 12 : hour;
  return hour24 * 60 + minute;
}

export type SlotRange = { start: number; end: number };

/** "1:00-2:00" becomes { start: 780, end: 840 } */
export function parseSlot(slot: string): SlotRange {
  const [from, to] = slot.split(/[-\u2013\u2014]/);
  return { start: toMinutes(from), end: toMinutes(to) };
}

/** True when two slot labels cover any of the same minutes. */
export function slotsOverlap(a: string, b: string): boolean {
  const first = parseSlot(a);
  const second = parseSlot(b);
  return first.start < second.end && second.start < first.end;
}

/**
 * Looks through every booking the student already has on this date, across
 * ALL spaces, and returns the first one that clashes with the chosen slot.
 * Returns null when the slot is free.
 */
export function findConflict(
  bookings: Booking[],
  date: string,
  slot: string
): Booking | null {
  const clash = bookings.find(
    (booking) => booking.date === date && slotsOverlap(booking.slot, slot)
  );
  return clash ?? null;
}

/** Today, written the way the booking cards show it. */
export function todayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * The first slot of the day nobody has taken yet, or null when the space is
 * fully booked. Slots are stored in chronological order, so the first free
 * one is the next free one.
 */
export function nextFreeSlot(space: StudySpace): string | null {
  return space.slots.find((slot) => !space.bookedSlots.includes(slot)) ?? null;
}

/** "10:00-11:00" -> "10:00", for compact labels. */
export function slotStart(slot: string): string {
  return slot.split(/[-\u2013\u2014]/)[0].trim();
}

/** "10:00-11:00" -> "10", for the tiny blocks on the day strip. */
export function slotStartHour(slot: string): string {
  return slotStart(slot).split(":")[0];
}