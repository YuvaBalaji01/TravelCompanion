import { useEffect, useState } from "react";

import type {
  CreateTripRequest,
  Trip,
} from "../types/trip";

import "../styles/TripForm.css";

interface TripFormProps {
  initialData?: Trip;
  buttonText: string;
  onSubmit: (
    trip: CreateTripRequest
  ) => Promise<void>;
}

const TripForm = ({
  initialData,
  buttonText,
  onSubmit,
}: TripFormProps): React.JSX.Element => {

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    if (!initialData) return;

    setDestination(initialData.destination);
    setStartDate(initialData.start_date);
    setEndDate(initialData.end_date);
    setDescription(initialData.description ?? "");

  }, [initialData]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    await onSubmit({
      destination,
      start_date: startDate,
      end_date: endDate,
      description,
    });

    if (!initialData) {
      setDestination("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    }
  };

  return (
    <form className="trip-form" onSubmit={handleSubmit}>

      <div className="trip-form__field trip-form__field--full">
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          placeholder="Where to?"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
        />
      </div>

      <div className="trip-form__row">

        <div className="trip-form__field">
          <label htmlFor="start-date">Depart</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />
        </div>

        <div className="trip-form__field">
          <label htmlFor="end-date">Return</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />
        </div>

      </div>

      <div className="trip-form__field trip-form__field--full">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Notes for a potential companion..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <button type="submit" className="trip-form__submit">
        {buttonText}
      </button>

    </form>
  );

};

export default TripForm;