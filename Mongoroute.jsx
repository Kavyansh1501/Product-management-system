import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mongoose1 from "./Mongoose/Mongoose1";
import Home from "./Mongoose/Home";
import Register from "./Mongoose/Register";
import PrivateRoute from "./Mongoose/PrivateRoute";
import { Mongonav } from "./Mongonav";

function Mongoroute() {
  return (
    <BrowserRouter>
      <Mongonav />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>}/>
        <Route path="/Mongoose1" element={<Mongoose1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Mongoroute;