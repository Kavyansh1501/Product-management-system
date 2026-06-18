import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mongoose1() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post( "http://localhost:5000/login", {
          name,
          password,
        }
      );
            if (res.data && res.data.success) {
        console.log(res.data.token);

        localStorage.setItem("token", res.data.token);

        alert("Login successfully");

        navigate("/home");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

        <br /><br />

        <input
          type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Mongoose1;