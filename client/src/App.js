import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Room from "./Pages/Room";
import About from "./Pages/About";
import DetailRoom from "./Pages/DetailRoom";
import Booking from "./Pages/Booking";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SearchResult from "./Pages/SearchResult";
import Register from "./Pages/Register";
import VerifyAccount from "./Pages/Verify";

function App() {
  return (
    <div className="bg-secondary-softblue">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-room" element={<Room />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms/:id" element={<DetailRoom />} />
          <Route path="/rooms" element={<SearchResult />} />
          {/* <Route path="/booking" element={<Booking />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:userId/:uniqueString" element={<VerifyAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
