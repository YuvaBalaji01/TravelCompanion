import type { Trip } from "../types/trip";

import "../styles/TripCard.css";

interface TripCardProps {
  trip: Trip;
  onEdit: (trip: Trip) => void;
  onDelete: (id: number) => void;
  onFindCompanion: (id: number) => void;
}

const TripCard = ({
  trip,
  onEdit,
  onDelete,
  onFindCompanion,
}: TripCardProps): React.JSX.Element => {

  return (

    <div className="trip-card">

      <div className="trip-card__main">

        <span className="route">
          {trip.start_date}
          {" → "}
          {trip.end_date}
        </span>

        <h3 className="title">{trip.destination}</h3>

        <p className="meta">
          {trip.description || "No description"}
        </p>

      </div>

      <div className="trip-card__stub">

        <button
          className="find"
          onClick={() =>
            onFindCompanion(trip.id)
          }
        >
          Find Companion
        </button>

        <button
          className="edit"
          onClick={() =>
            onEdit(trip)
          }
        >
          Edit
        </button>

        <button
          className="delete"
          onClick={() =>
            onDelete(trip.id)
          }
        >
          Delete
        </button>

      </div>

    </div>

  );

};

export default TripCard;