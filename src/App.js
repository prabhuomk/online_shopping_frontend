import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { Header } from "./header.js";
import { HomePage } from "./homepage.js";
import SignUp from "./signup.js";
import Login from "./login.js";
import ForgetPassword from "./forgetpassword.js";
import Reset from "./resetpassword.js";
import { Activate } from "./accountactivate.js";
import { MyAdmin } from "./admin.js";

import { ListOfProduct } from "./productlist.js";
import { NewProduct } from "./newproduct.js";
import { EditProduct } from "./editproduct";
import { MyCart } from "./mycart";
import { MyOrder } from "./myorder";
import { useState } from "react";
import { OrderList } from "./orderlist";
import { CancelList } from "./cancellist";
import { DeliveryList } from "./deliverylist";
export default function App() {
  const usertkn = !localStorage.getItem("usertoken") && "";
  const [userToken, setUserToken] = useState(usertkn);
  const admintkn = !localStorage.getItem("admintoken") && "";
  const [adminToken, setAdminToken] = useState(admintkn);

  const [email, setEmail] = useState("");
  const [cart, setCart] = useState([]);
  const [triger, setTriger] = useState(false);
  return (
    <div className="App">
      <Header
        userToken={userToken}
        setUserToken={setUserToken}
        adminToken={adminToken}
        setAdminToken={setAdminToken}
        cart={cart}
        setCart={setCart}
        email={email}
        triger={triger}
      />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login setUserToken={setUserToken} setEmail={setEmail} />
        </Route>

        <Route path="/admin">
          <MyAdmin setAdminToken={setAdminToken} />
        </Route>
        <Route path="/productlist">
          <ListOfProduct email={email} setTriger={setTriger} triger={triger} />
        </Route>
        <Route path="/addcart">
          <MyCart email={email} cart={cart} setCart={setCart} />
        </Route>
        <Route path="/myorder">
          <MyOrder email={email} />
        </Route>
        <Route path="/orderlist">
          <OrderList />
        </Route>
        <Route path="/deliverylist">
          <DeliveryList />
        </Route>
        <Route path="/cancellist">
          <CancelList />
        </Route>
        <Route path="/createproduct">
          <NewProduct />
        </Route>

        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>

        <Route path="/editproduct/:_id">
          <EditProduct />
        </Route>

        <Route path="/account-activation/:email_id/:token">
          <Activate />
        </Route>
        <Route path="/password-reset/:id/:token">
          <Reset />
        </Route>
      </Switch>
    </div>
  );
}
