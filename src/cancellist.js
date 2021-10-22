import { useEffect, useState } from "react";

export function CancelList() {
  const [order, setOrder] = useState([]);
  const [verify, setVerify] = useState(false);

  function RemoveCancelledOrder(_id) {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/cart/${_id}`, {
      method: "DELETE"
    })
      .then((data) => data.json())
      .then((data) => setVerify(true));
  }
  function LoadOrder() {
    fetch("https://pk-onlineshopping.herokuapp.com/admin/cancelledlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((data) => setOrder(data));
  }

  useEffect(() => {
    LoadOrder();
  }, [verify]);

  return (
    <div className="TableList">
      <h3>Cancelled List</h3>
      <table className="table table-striped">
        {order.length ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Price</th>
              <th scope="col">Delivery Address</th>
              <th scope="col">Mode of Payment</th>
              <th scope="col">Payment_id</th>
              <th scope="col">Delete Order</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {order.length ? (
            order.map((order, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.product_price}</td>
                <td>{order.address}</td>
                <td>{order.Mode_Payment}</td>
                <td>{order.Payment_id}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => RemoveCancelledOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h3 className="text-center">No Cancellation</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
