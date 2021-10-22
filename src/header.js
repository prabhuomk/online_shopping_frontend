import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
export function Header({
  userToken,
  setUserToken,
  adminToken,
  setAdminToken,
  cart,
  setCart,
  email,
  triger
}) {
  const history = useHistory();
  const Logout = () => {
    localStorage.setItem("usertoken", "");
    setUserToken("");

    alert("logged-out-successfully");
    history.push("/");
  };
  const LogoutAdmin = () => {
    localStorage.setItem("admintoken", "");
    setAdminToken("");

    alert("logged-out-successfully");
    history.push("/");
  };
  let qty = 0;
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
  qty = cart.reduce(function (acc, curr) {
    return acc + curr.quantity;
  }, 0);
  useEffect(() => {
    LoadCart();
  }, [triger]);

  return (
    <div>
      <nav
        className="navbar navbar-light bg-danger"
        style={{ padding: "10px" }}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <i className="fa fa-shopping-bag fa-2x"></i>PK's ONLINE SHOPPING{" "}
          <i className="fa fa-shopping-bag fa-2x"></i>
        </a>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {userToken === "" && adminToken === "" ? (
            <>
              <button
                className="btn btn-light me-md-2"
                onClick={() => history.push("/")}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> HOME
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/signup")}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>SIGNUP
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/login")}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> LOGIN
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/admin")}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> ADMIN
              </button>
            </>
          ) : (
            <>
              {userToken !== "" ? (
                <>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/productlist")}
                  >
                    Products
                  </button>
                  <Badge badgeContent={qty} color="primary">
                    <button
                      className="btn btn-light"
                      onClick={() => history.push("/addcart")}
                    >
                      MyCart{" "}
                      <i
                        className="fa fa-shopping-cart fa-2x"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </Badge>
                  <span></span>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("./myorder")}
                  >
                    MyOrder
                  </button>
                  <button className="btn btn-light" onClick={Logout}>
                    logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/createproduct")}
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Create/Edit Product
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/orderlist")}
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Ordered
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/deliverylist")}
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Delivered
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/cancellist")}
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Cancelled
                  </button>

                  <button className="btn btn-light" onClick={LogoutAdmin}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    admin logout
                  </button>
                </>
              )}
            </>
          )}
          ;
        </div>
      </nav>
    </div>
  );
}
