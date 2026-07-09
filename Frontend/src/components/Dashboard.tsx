import { useEffect, useState } from "react";
import type { AxiosError } from "axios";

import "../index.css";

import TripForm from "./TripForm";
import TripCard from "./TripCard";

import {
  addTrip,
  getMyTrips,
  updateTrip
} from "../services/tripService";

import type {
  Trip,
  CreateTripRequest,
} from "../types/trip";

import type { ErrorResponse } from "../types/auth";

const Dashboard = (): React.JSX.Element => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingTrip, setEditingTrip] =
    useState<Trip | null>(null);

  const loadTrips = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await getMyTrips();

      setTrips(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleCreateTrip = async (
    trip: CreateTripRequest
  ): Promise<void> => {
    try {
      await addTrip(trip);

      await loadTrips();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(
        err.response?.data.message ??
        "Unable to create trip"
      );
    }
  };

 

  const handleDeleteTrip = (id: number): void => {
    console.log("Delete Trip:", id);
   
  };

  const handleFindCompanion = (trip: Trip): void => {
    console.log("Find Companion:", trip);
  };

  const handleEditTrip = (
    trip: Trip
  ): void => {

    setEditingTrip(trip);
    

  };

  const handleUpdateTrip = async (
    trip: CreateTripRequest
  ): Promise<void> => {

    if (!editingTrip) return;

    try {

      await updateTrip(
        editingTrip.id,
        trip
      );

      setEditingTrip(null);

      await loadTrips();

    } catch (error) {
  const err = error as AxiosError<ErrorResponse>;

  console.log(err.response);
  console.log(err.response?.data);
  console.log(err.response?.status);

  alert(
    err.response?.data?.message ??
    "Unable to update trip"
  );
}

  };

  return (
    <div className="dashboard">

      <h1>My Dashboard</h1>

      <TripForm
        initialData={editingTrip ?? undefined}
        buttonText={
          editingTrip
            ? "Update Trip"
            : "Save Trip"
        }
        onSubmit={
          editingTrip
            ? handleUpdateTrip
            : handleCreateTrip
        }
      />

      <hr />

      <h2>My Trips</h2>

      {loading ? (
        <p>Loading...</p>
      ) : trips.length === 0 ? (
        <p>No trips added yet.</p>
      ) : (
        trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onEdit={handleEditTrip}
            onDelete={handleDeleteTrip}
            onFindCompanion={handleFindCompanion}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;