import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
function Home() {
    const [productname,setproductname]=useState("");
    const [price,setprice]=useState("");
    const [productmfd,setproductmfd]=useState("");
    const [productexp,setproductexp]=useState("");
      const [products, setProducts] = useState([]);
    const navigate = useNavigate();  


       useEffect(() => {
          const token = localStorage.getItem("token");
      
          if (!token) {
            navigate("/Mongoose1");
            return;
          }
      
          axios.get("http://localhost:5000/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log("Dashboard Data:", res.data);
            })
            .catch((error) => {
              console.log(error);
      
              localStorage.removeItem("token");
              navigate("/Mongoose1");
            });
        }, [navigate]);
      
        const logout = () => {
          localStorage.removeItem("token");
          navigate("/Mongoose1");
        };

const addproduct=async(e)=>{
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
        const res=await axios.post("http://localhost:5000/addproduct",{
            productname,
            price,
            productmfd,
            productexp
        },{
        headers:{
          authorization: `Bearer ${token}`,
        }
        }
      );

        if(res.data.success){
            alert(res.data.message);
            setproductname("");
            setprice("");
            setproductmfd("");
            setproductexp("");
        }}
        catch(error){
            console.log(error);
            alert("Server Error");
            
        }
    }
 const displayProducts = async () => {
    try {
      const token=localStorage.getItem("token");
      const res = await axios.get( "http://localhost:5000/getproducts" , {
        headers: {
          authorization: `Bearer ${token}`,
        }
      });

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      alert("Error fetching products");
    }
  };

  return (
     <div>
      <button onClick={logout}>
    Logout
</button>
      <h2>Add Product</h2>

      <form onSubmit={addproduct}>
        <input type="text" placeholder="Product Name" value={productname} onChange={(e) => setproductname(e.target.value)} required />

        <br /><br />

        <input type="number" placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)} required/>

        <br /><br />

        <label>MFD:</label>
        <input type="date" value={productmfd} onChange={(e) => setproductmfd(e.target.value)} required />

        <br /><br />

        <label>EXP:</label>
        <input type="date" value={productexp} onChange={(e) => setproductexp(e.target.value)} required/>

        <br /><br />

        <button type="submit">
          Add Product
        </button>
      </form>
      <br />
      <button onClick={displayProducts}>
        Display Products
      </button>

      <br /><br />

      {products.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>MFD</th>
              <th>EXP</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productname}</td>
                <td>{item.price}</td>
                <td>
                  {new Date(item.productmfd)
                    .toLocaleDateString()}
                </td>
                <td>
                  {new Date(item.productexp)
                    .toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  );
   
}

export default Home;