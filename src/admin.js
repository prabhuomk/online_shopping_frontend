import { useState } from "react";
import { useHistory } from "react-router-dom";

export function MyAdmin({ setAdminToken }) {
  const [adminid, setAdminId] = useState("");

  const [password, setPassword] = useState("");
  const [change, setChange] = useState(true);

  const history = useHistory();

  function AdminSignUp(event) {
    event.preventDefault();
    if (adminid && password.length >= 5) {
      fetch("https://pk-onlineshopping.herokuapp.com/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ admin_id: adminid, password: password })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);

          setAdminId("");
          setPassword("");
        });
    } else {
      alert(
        "enter all fields and password length should be greater or equal to 5"
      );
    }
  }
  function AdminLogin(event) {
    event.preventDefault();
    if (adminid && password) {
      fetch("https://pk-onlineshopping.herokuapp.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ admin_id: adminid, password: password })
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("admintoken", data.token);
            setAdminToken(data.token);

            alert(data.message);
            setAdminId("");
            setPassword("");
            history.push("/createproduct");
          } else {
            alert(data.message);
          }
        });
    } else {
      alert("enter all field");
    }
  }
  return (
    <div>
      <br />
      <br />

      <div className="container-md forget-password">
        <div className="row">
          <div className="col-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setChange(true)}
                  >
                    Click to signup
                  </button>
                  <span> </span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setChange(false)}
                  >
                    Click to login
                  </button>
                  <img
                    className="Icon"
                    src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
                    alt="login"
                    border="0"
                  />
                  {change === true ? (
                    <h2 className="text-center">Signup</h2>
                  ) : (
                    <h2 className="text-center">Login</h2>
                  )}

                  <div autocomplete="off" className="form">
                    <br />
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          placeholder="email_id"
                          className="form-control"
                          type="text"
                          value={adminid}
                          onChange={(e) => setAdminId(e.target.value)}
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <input
                          placeholder="Password"
                          className="form-control"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      {change === true ? (
                        <input
                          className="btn btn-lg btn-success btn-block"
                          value="Login"
                          type="button"
                          onClick={AdminSignUp}
                        />
                      ) : (
                        <input
                          className="btn btn-lg btn-primary btn-block"
                          value="Login"
                          type="button"
                          onClick={AdminLogin}
                        />
                      )}
                    </div>
                    <div>
                      <b>Demo credentials</b>
                    </div>
                    <div>
                      <b>id=</b>pk1
                    </div>
                    <div>
                      <b>password=</b>pk007
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <p>
        <b>NOTE:</b> for <b>signup</b> Admin_id can only be "pk1" or "pk2" or
        "pk3" , already Admin_id "pk1" has been used for signup
      </p>
      <p>
        hence use other two id or do <b>login </b>using
        <b> Admin_id = "pk1" and password = "pk007"</b>
      </p>
    </div>
  );
}
