import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Login({ setUserToken, setEmail }) {
  const history = useHistory();
  const [email_id, setemail_id] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmit = () => {
    setDisable(true);
    if (email_id && password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://pk-onlineshopping.herokuapp.com/user/login", {
        method: "POST",
        body: JSON.stringify({ email_id, password }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.email_id) {
            localStorage.setItem("usertoken", data.token);
            setUserToken(data.token);
            setEmail(data.email_id);
            setDisable(false);
            alert(data.message);
            setemail_id("");
            setPassword("");
            history.push("/productlist");
          } else {
            alert(data.message);
            setDisable(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter the fields");
      setDisable(false);
    }
  };
  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  className="Icon"
                  src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
                  alt="login"
                  border="0"
                />
                <h2 className="text-center">Login</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="email_id"
                        className="form-control"
                        type="text"
                        value={email_id}
                        onChange={(e) => setemail_id(e.target.value)}
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
                    <button className="btn btn-success" onClick={handleSubmit}>
                      {disable === false ? (
                        "Login"
                      ) : (
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        ></div>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push("/signup")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => history.push("/forgetpassword")}
                >
                  Forgot Password
                </button>
                <div>
                  <b>Demo credentials</b>
                </div>
                <div>
                  <b>email_id=</b>pk@gmail.com
                </div>
                <div>
                  <b>password=</b>prabhu007
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
