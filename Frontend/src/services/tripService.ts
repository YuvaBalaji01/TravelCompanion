import API from "./api";

import type {
  Trip,
  SearchResult,
  CreateTripRequest,
} from "../types/trip";

export const addTrip = async (
  trip: CreateTripRequest
): Promise<{ message: string }> => {
  const res = await API.post("/trips/add", trip);
  return res.data;
};

export const getMyTrips = async (): Promise<Trip[]> => {
  const res = await API.get<Trip[]>("/trips/my");
  return res.data;
};

export const updateTrip = async (
  id: number,
  trip: CreateTripRequest
): Promise<{ message: string }> => {
  const res = await API.put(`/trips/${id}`, trip);
  return res.data;
};

export const deleteTrip = async (
  id: number
): Promise<{ message: string }> => {
  const res = await API.delete(`/trips/${id}`);
  return res.data;
};

export const findCompanions = async (
  tripId: number
): Promise<SearchResult[]> => {
  const res = await API.get<SearchResult[]>(
    `/trips/${tripId}/matches`
  );

  return res.data;
};