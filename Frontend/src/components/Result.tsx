import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

import type { SearchResult } from "../types/trip";

const Results = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("results");

    if (stored) {
      setResults(JSON.parse(stored) as SearchResult[]);
    }
  }, []);

  return (
    <div className="results-root">
      <div className="results-header">
        <h1>Matching Travel Companions</h1>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
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
              key={user.id}
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

              <button className="connect-btn">
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;