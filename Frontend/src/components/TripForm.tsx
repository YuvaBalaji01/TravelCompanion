import { useEffect, useState } from "react";

import type {
  CreateTripRequest,
  Trip,
} from "../types/trip";

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
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) =>
          setDestination(e.target.value)
        }
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">

        {buttonText}

      </button>

    </form>
  );

};

export default TripForm;