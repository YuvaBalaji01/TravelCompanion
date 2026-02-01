
# 🌍 Travel Companion  
A full-stack MERN-style web application that helps users find travel partners based on destination and matching trip dates.  
Users can register, log in, save trip plans, and search for other travelers with overlapping travel periods.

---

Demo Video: https://drive.google.com/file/d/1fLP-Y5kXUzR9CfcpACc4KJFfda1QwNrX/view?usp=sharing

## 🚀 Features

### 👤 User Authentication  
- JWT-based login & registration  
- Secure password hashing using bcrypt  
- Auth-protected routes for sensitive actions  

### 🧳 Trip Matching  
- Users can add their travel plans (destination + dates)  
- Search for matching travel companions  
- Matches are based on:
  - Same destination  
  - Overlapping travel dates  

### 🖥 Full Frontend  
- React-based UI  
- Modern design (glassmorphism, responsive)  
- Search interface on homepage  
- Result page with cards for matching users  
- Profile page showing user details  

### 🗄 Backend  
- Node.js + Express API  
- MySQL  
- Separate controllers, routes, middleware  
- CORS + dotenv configuration  

---

## 📂 Project Structure

TravelCompanion/
│

├── Backend/

│ ├── src/

│ │ ├── config/db.js

│ │ ├── controllers/

│ │ ├── middleware/

│ │ ├── routes/

│ │ └── server.js

│ ├── package.json

│ └── .env (not included in repo)

│
└── Frontend/

├── src/

│ ├── components/

│ ├── services/api.js

│ ├── App.jsx

│ ├── main.jsx

│ └── index.css

├── package.json

└── vite.config.js


---

## 🛠️ Technologies Used

### **Frontend**
- React.js  
- React Router  
- Axios  
- Vite  
- Modern UI (Glassmorphism, animations)

### **Backend**
- Node.js  
- Express.js  
- bcrypt  
- JWT Authentication  
- CORS  
- dotenv  

### **Database**
- MySQL 





