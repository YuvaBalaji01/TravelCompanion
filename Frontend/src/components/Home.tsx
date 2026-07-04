import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import API from "../services/api";
import "../index.css";

import type { User } from "../types/user";
import type { Trip } from "../types/trip";
import type { ErrorResponse } from "../types/auth";

const Home = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const storedUser = localStorage.getItem("user");

  const user: User | null = storedUser
    ? (JSON.parse(storedUser) as User)
    : null;

  const handleSearch = async (): Promise<void> => {
    try {
      const res = await API.post<Trip[]>("/trips/search", {
        destination,
        start_date: startDate,
        end_date: endDate,
      });

      localStorage.setItem("results", JSON.stringify(res.data));

      navigate("/results");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(err.response?.data?.message ?? "Please login first");
    }
  };

  return (
    <div className="home-root">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <header className="hero-v2">
        <nav className="mini-nav">
          <div className="logo">
            Travel<span>Companion</span>
          </div>

          {user ? (
            <button
              className="nav-btn"
              onClick={() => navigate("/profile")}
            >
              {user.name}
            </button>
          ) : (
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </nav>

        <div className="hero-main-content">
          <div className="badge">
            ✨ New: Group Treks in Nepal
          </div>

          <h1>
            Don't Just Visit.
            <br />
            <span className="gradient-text">
              Belong Anywhere.
            </span>
          </h1>

          <p>
            Find the perfect travel partner to share costs,
            memories, and horizons. Your next story starts
            with a "Hello."
          </p>
        </div>

        <div className="search-container-v2">
          <div className="glass-form">
            <div className="input-box">
              <label>Where to?</label>

              <input
                type="text"
                placeholder="Search Destination"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />
            </div>

            <div className="v-divider"></div>

            <div className="input-box">
              <label>Arrival</label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />
            </div>

            <div className="v-divider"></div>

            <div className="input-box">
              <label>Departure</label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />
            </div>

            <button
              className="glow-btn"
              onClick={handleSearch}
            >
              Search Now
            </button>
          </div>
        </div>
      </header>

      <section className="scroll-hint">
        <p>Scroll to explore curated experiences</p>

        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;