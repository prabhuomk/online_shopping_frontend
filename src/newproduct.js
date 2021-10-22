import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function NewProduct() {
  const [details, setDetails] = useState([]);
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState(false);
  const [verify, setVerify] = useState(false);
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  function CreateProduct(event) {
    setDisable(true);
    event.preventDefault();
    if (src && name && price) {
      fetch("https://pk-onlineshopping.herokuapp.com/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("admintoken")
        },
        body: JSON.stringify({
          img_src: src,
          product_name: name,
          product_price: Number(price)
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setSrc("");
          setName("");
          setPrice("");
          setChange(!change);
          setDisable(false);
        });
    } else {
      alert("fill properly - price should be integer and src shold be a url");
      setDisable(false);
    }
  }
  function GetAll() {
    fetch("https://pk-onlineshopping.herokuapp.com/user/listofproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage.getItem("usertoken") ||
          localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }
  useEffect(() => {
    GetAll();
  }, [change, verify]);

  function DeleteProduct(_id) {
    fetch(`https://pk-onlineshopping.herokuapp.com/admin/editproduct/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setVerify(true);
      });
  }

  return (
    <div>
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">
            <b>Image Url</b>
          </label>
          <input
            type="text"
            onChange={(event) => setSrc(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="enter the image url"
            value={src}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail2">
            <b>Product Name</b>
          </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            id="exampleInputEmail2"
            placeholder="enter product name"
            value={name}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail3">
            <b>Product Price</b>
          </label>
          <input
            type="Number"
            onChange={(event) => setPrice(event.target.value)}
            className="form-control"
            id="exampleInputEmail3"
            placeholder="enter the price amount"
            value={price}
            aria-describedby="emailHelp"
          />
        </div>

        <br />
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateProduct}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
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
                onClick={() => history.push(`/editproduct/${data._id}`)}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>EDIT
              </button>
              <button
                className="btn btn-dark me-md-2"
                onClick={() => DeleteProduct(data._id)}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
