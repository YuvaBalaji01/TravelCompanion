import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="profile-root">
      <div className="profile-card">

        {/* Profile Picture */}
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <h1>{user.name}</h1>

        {/* Email */}
        <p className="profile-email">{user.email}</p>

        {/* Bio */}
        <p className="profile-bio">
          {user.bio || "No bio added yet."}
        </p>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
