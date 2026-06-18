import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post( "http://localhost:5000/addemployee", {
          name,
          password,
        }
      );

      if (res.data.success) {
        alert(res.data.message);

        setName("");
        setPassword("");

        navigate("/Mongoose1");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div>
      <h2>Employee Registration</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <br /><br />

        <input  type="password"  placeholder="Enter Password"  value={password}  onChange={(e) => setPassword(e.target.value)}  required/>

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <p>
        Already have an account?{" "}
        <Link to="/Mongoose1">Login</Link>
      </p>
    </div>
  );
}

export default Register;