import { useEffect, useState } from "react";
import { Increment } from "./increment";
import { Decrement } from "./decrement";

import { RazorPay } from "./RazorPay";

export function MyCart({ email, cart, setCart }) {
  const [change, setChange] = useState(false);
  const [verify, setVerify] = useState(false);
  const [click, setClick] = useState(false);
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState("");
  const [razorid, setRazorId] = useState("");
  const [disable, setDisable] = useState(false);
  let total = cart.reduce(function (acc, curr) {
    return acc + curr.product_price;
  }, 0);
  function RemoveCart(_id) {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/cart/${_id}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => setVerify(true));
  }
  function LoadCart() {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/mycart/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((data) => setCart(data));
  }
  function EmptyCart() {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/mycart/${email}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => setVerify(true));
  }

  function OrderProduct(e) {
    setDisable(true);
    e.preventDefault();

    if (address && pay === "Cash on delivery") {
      fetch(`https://pk-onlineshopping.herokuapp.com/user/myorder/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("usertoken")
        },
        body: JSON.stringify({
          address: address,
          Mode_Payment: pay,
          Payment_id: "no id for cash on delivery"
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setAddress("");
          setPay("");
          setDisable(false);
        });
    } else if (address && pay === "online payment" && razorid !== "") {
      fetch(`https://pk-onlineshopping.herokuapp.com/user/myorder/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("usertoken")
        },
        body: JSON.stringify({
          address: address,
          Mode_Payment: pay,
          Payment_id: razorid
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setAddress("");
          setPay("");
          setDisable(false);
        });
    } else if (address && pay === "online payment" && razorid === "") {
      alert("Online payment not done ");
      setDisable(false);
    } else {
      alert("enter address ");
      setDisable(false);
    }
  }

  useEffect(() => {
    LoadCart();
  }, [change, verify]);

  return (
    <div className="TableList">
      <h3>Cart List</h3>
      <table className="table table-striped">
        {cart.length ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Price</th>
              <th scope="col">Remove from Cart</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {cart.length ? (
            cart.map((cart, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{cart.product_name}</td>
                <td>
                  <Decrement
                    email={email}
                    name={cart.product_name}
                    setChange={setChange}
                    quantity={cart.quantity}
                  />
                  <button type="button" className="btn btn-light">
                    {cart.quantity}
                  </button>

                  <Increment
                    email={email}
                    name={cart.product_name}
                    setChange={setChange}
                  />
                </td>
                <td>{cart.product_price}</td>
                <td>
                  <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={() => RemoveCart(cart._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h2 className="text-center">EmptyCart</h2>
              </td>
            </tr>
          )}
          <tr>
            <td></td>
            <td></td>
            <td>Total price</td>
            <td>{total}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => EmptyCart()}
              >
                Empty Cart
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setClick(!click)}
              >
                Click To Order
              </button>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {click === false ? (
        ""
      ) : (
        <form className="Myform">
          <div className="form-group">
            <label for="exampleInputEmail2">
              <b>Billing Address</b>
            </label>
            <textarea
              className="form-control"
              onChange={(event) => setAddress(event.target.value)}
              value={address}
              id="exampleInputEmail2"
              rows="5"
              cols="33"
            ></textarea>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Select Payment Mode</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setPay(e.target.value)}
              value={pay}
            >
              <option>----------------------------- \/</option>
              <option>Cash on delivery</option>
              <option>online payment</option>
            </select>
          </div>

          {pay === "online payment" ? (
            <div>
              <RazorPay total={total} setRazorId={setRazorId} />
            </div>
          ) : (
            ""
          )}
          {disable === false ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => OrderProduct(e)}
            >
              BOOK
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      )}
    </div>
  );
}
