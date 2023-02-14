import "./App.css";
import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import firebase from 'firebase/compat/app';

import Home from "./Pages/Home";
import Room from "./Pages/Room";
import About from "./Pages/About";
import DetailRoom from "./Pages/DetailRoom";
import Booking from "./Pages/Booking";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import HomepageLayout from "./Layouts/HomepageLayout.jsx";
import Register from "./Pages/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setCurrentUser(user.id);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div className="bg-secondary-softblue">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <HomepageLayout currentUser={currentUser}>
                  <Home />
                </HomepageLayout>
              )
            }
          />
          <Route
            path="/register"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Register />
              </HomepageLayout>
            }
          />
          <Route
            path="/login"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Login />
              </HomepageLayout>
            }
          />
          <Route path="/list-room" element={<Room />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail-room" element={<DetailRoom />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/profile"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Profile />
              </HomepageLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
