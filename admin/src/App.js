import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Room from "./Pages/Room";
import Customer from "./Pages/Customer";
import Booking from "./Pages/Booking";
import Review from "./Pages/Review";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="bg-secondary-softblue">
      <Router>
        <Routes>
          {/* <Route element={<PrivateRouteLogin />}> */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/new-pw" element={<NewPassword />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/verify" element={<VerifyEmail />} /> */}
          {/* </Route> */}

          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/room" element={<Room />} />
          {/* <Route path="/create-room" element={<CreateRoom />} /> */}
          {/* <Route path="/update-room/:id" element={<UpdateRoom />} /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/review" element={<Review />} />
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
