import type { Trip } from "../types/trip";

interface TripCardProps {
  trip: Trip;
  onEdit: (trip: Trip) => void;
  onDelete: (id: number) => void;
  onFindCompanion: (trip: Trip) => void;
}

const TripCard = ({
  trip,
  onEdit,
  onDelete,
  onFindCompanion,
}: TripCardProps): React.JSX.Element => {

  return (

    <div className="trip-card">

      <h3>{trip.destination}</h3>

      <p>

        {trip.start_date}

        {" → "}

        {trip.end_date}

      </p>

      <p>

        {trip.description || "No description"}

      </p>

      <button
        onClick={() =>
          onFindCompanion(trip)
        }
      >
        Find Companion
      </button>

      <button
        onClick={() =>
          onEdit(trip)
        }
      >
        Edit
      </button>

      <button
        onClick={() =>
          onDelete(trip.id)
        }
      >
        Delete
      </button>

    </div>

  );

};

export default TripCard;