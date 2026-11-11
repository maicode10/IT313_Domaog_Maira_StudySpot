import { colors } from "../theme/theme";
import { OccupancyLevel, StudySpace } from "../types";

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