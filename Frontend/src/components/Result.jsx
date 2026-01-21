import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("results")) || [];
    setResults(stored);
  }, []);

  return (
    <div className="results-root">

      <div className="results-header">
        <h1>Matching Travel Companions</h1>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>

      {/* No matches */}
      {results.length === 0 ? (
        <div className="no-results">
          <h3>No matches found 🥲</h3>
          <p>Try different dates or destinations.</p>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((u) => (
            <div className="result-card" key={u.id}>
              
              {/* Avatar */}
              <div className="avatar">
                {u.name.charAt(0).toUpperCase()}
              </div>

              <h2>{u.name}</h2>
              <p className="bio">{u.bio}</p>

              <div className="info-box">
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Travel Dates:</strong></p>
                <p>{u.start_date} → {u.end_date}</p>
              </div>

              <button className="connect-btn">Connect</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
