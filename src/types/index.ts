export type SpaceType = "Quiet" | "Group";

export type StudySpace = {
  id: string;
  name: string;
  building: string;
  floor: string;
  type: SpaceType;
  seats: number;
  occupied: number;
  amenities: string[];
  description: string;
  slots: string[];
  bookedSlots: string[];
};

export type Booking = {
  id: string;
  spaceId: string;
  spaceName: string;
  date: string;
  slot: string;
  groupSize: number;
  purpose: string;
  confirmed: boolean;
};

export type User = {
  name: string;
  section: string;
};

export type FilterKey = "All" | "Quiet" | "Group" | "Open now";

export type OccupancyLevel = "low" | "medium" | "high";