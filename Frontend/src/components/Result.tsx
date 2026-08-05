import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import "../styles/result.css";

import "../styles/result.css";

import type { SearchResult } from "../types/trip";
import type { ErrorResponse } from "../types/auth";

import { sendConnectionRequest } from "../services/requestService";

const Results = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [sentRequests, setSentRequests] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const stored = localStorage.getItem("results");

    if (stored) {
      setResults(JSON.parse(stored) as SearchResult[]);
    }
  }, []);

  const handleConnect = async (
    tripId: number,
    receiverId: number
  ): Promise<void> => {
    try {
      await sendConnectionRequest({
        tripId,
        receiverId,
      });


      setSentRequests((prev) => {
        const updated = new Set(prev);
        updated.add(tripId);
        return updated;
      });

    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(
        err.response?.data?.message ??
          "Unable to send connection request"
      );
    }
  };

 

  return (
    <div className="results-root">
      <div className="results-header">
        <h1>Matching Travel Companions</h1>

        <button onClick={() => navigate("/dashboard")}> X </button>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <h3>No matches found 🥲</h3>
          <p>Try different dates or destinations.</p>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((user) => (
            <div
              className="result-card"
              key={user.trip_id}
            >
              <div className="avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h2>{user.name}</h2>

              <p className="bio">
                {user.bio || "No bio available"}
              </p>

              <div className="info-box">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>Travel Dates:</strong>
                </p>

                <p>
                  {user.start_date} → {user.end_date}
                </p>
              </div>

              <button
                className="connect-btn"
                disabled={sentRequests.has(user.trip_id)}
                onClick={() =>
                  handleConnect(
                    user.trip_id,
                    user.user_id
                  )
                }
              >
                {sentRequests.has(user.trip_id)
                  ? "✓ Request Sent"
                  : "Connect"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;