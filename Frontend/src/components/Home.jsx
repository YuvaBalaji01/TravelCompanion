import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import '../index.css';

const Home = () => {

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  const handleSearch = async () => {
  try {
    const res = await API.post("/trips/search", {
      destination,
      start_date: startDate,
      end_date: endDate,
    });

    localStorage.setItem("results", JSON.stringify(res.data));
    navigate("/results");
  } catch (err) {
    alert(err.response?.data?.message || "Please login first");
  }
  };


  return (
    <div className="home-root">
      {/* Decorative Blur Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <header className="hero-v2">
        <nav className="mini-nav">
          <div className="logo">Travel<span>Companion</span></div>
          {user ? (
          <button className="nav-btn" onClick={() => navigate("/profile")}>
          {user.name}
          </button>
          ) : (
         <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
          </button>
          )}


        </nav>

        <div className="hero-main-content">
          <div className="badge">✨ New: Group Treks in Nepal</div>
          <h1>Don't Just Visit.<br/><span className="gradient-text">Belong Anywhere.</span></h1>
          <p>Find the perfect travel partner to share costs, memories, and horizons. Your next story starts with a "Hello."</p>
        </div>

        <div className="search-container-v2">
          <div className="glass-form">
            <div className="input-box">
              <label>Where to?</label>
              <input type="text" placeholder="Search Destination" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="v-divider"></div>
            <div className="input-box">
              <label>Arrival</label>
              <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="v-divider"></div>
            <div className="input-box">
              <label>Departure</label>
             <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button className="glow-btn" onClick={handleSearch}>
              Search Now</button>
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