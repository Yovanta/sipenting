import "./App.css";

import { useContext } from "react";
import { DarkModeContext } from "./Context/darkModeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Room from "./Pages/Room";
import Customer from "./Pages/Customer";
import Booking from "./Pages/Booking";
import Review from "./Pages/Review";
import NotFound from "./Pages/NotFound";
import PrivateRouteLogin from "./PrivateRoute/PrivateRouteLogin";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateRoom from "./Pages/UpdateRoom";
import UpdateBooking from "./Pages/UpdateBooking";

function App() {
  return (
    <div className="bg-secondary-softblue w-full">
      <Router>
        <Routes>
          <Route element={<PrivateRouteLogin />}>
            <Route path="/" element={<Login />} />
            {/* <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/new-pw" element={<NewPassword />} /> */}
          </Route>

          <Route element={<PrivateRoute />}>
            <Route exact={true} path="/dashboard" element={<Dashboard />} />
            <Route path="/room" element={<Room />} />
            <Route path="/update-room/:id" element={<UpdateRoom />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/update-booking/:id" element={<UpdateBooking />} />
            <Route path="/review" element={<Review />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
