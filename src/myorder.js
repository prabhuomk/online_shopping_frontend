import { useEffect, useState } from "react";

export function MyOrder({ email }) {
  const [order, setOrder] = useState([]);
  const [verify, setVerify] = useState(false);

  function CancelOrder(_id) {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/cancel/${_id}`, {
      method: "POST"
    })
      .then((data) => data.json())
      .then((data) => setVerify(true));
  }
  function LoadOrder() {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/order/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
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
      <h3>Order List</h3>
      <table className="table table-striped">
        {order.length ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Product Price</th>
              <th scope="col">Cancel Order</th>
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
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => CancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h3 className="text-center">No Order</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
