import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function ListOfProduct({ email, triger, setTriger }) {
  const [details, setDetails] = useState([]);

  const history = useHistory();
  function GetAll() {
    fetch("https://pk-onlineshopping.herokuapp.com/user/listofproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }
  useEffect(() => {
    GetAll();
  }, []);

  function AddToCart(name, price) {
    fetch("https://pk-onlineshopping.herokuapp.com/user/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      },
      body: JSON.stringify({
        email_id: email,
        product_name: name,
        product_price: price,
        quantity: 1
      })
    })
      .then((data) => data.json())
      .then((data) => {
        setTriger(!triger);

        alert(data.message);
      });
  }

  return (
    <div className="product">
      {details.map((data) => (
        <div
          className="card"
          style={{ width: "18rem", backgroundColor: "#ff6666" }}
        >
          <img src={data.img_src} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{data.product_name}</h5>
            <p className="card-text">{data.product_price}</p>
            <button
              className="btn btn-dark me-md-2"
              onClick={() => AddToCart(data.product_name, data.product_price)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
