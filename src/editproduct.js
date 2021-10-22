import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
export function EditProduct() {
  let { _id } = useParams();
  const history = useHistory();
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disable, setDisable] = useState(false);
  const [rec, SetRec] = useState({});

  function EditMyProduct() {
    setDisable(true);
    if (src && name && price) {
      fetch(
        `https://pk-onlineshopping.herokuapp.com/admin/editproduct/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("admintoken")
          },
          body: JSON.stringify({
            img_src: src,
            product_name: name,
            product_price: price
          })
        }
      )
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setDisable(false);
          history.push("/createproduct");
        });
    } else {
      alert("make change in the default value shown");
      setDisable(false);
    }
  }

  function GetProductData(_id) {
    fetch(`https://pk-onlineshopping.herokuapp.com/user/productlist/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage.getItem("usertoken") ||
          localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((data) => SetRec(data));
  }

  useEffect(() => {
    GetProductData(_id);
  }, []);
  return (
    <div>
      <div>
        <br />
        <br />
        {rec._id ? (
          <form className="Myform">
            <div className="form-group">
              <label for="exampleInputEmail2">Image url</label>
              <input
                type="text"
                onChange={(event) => setSrc(event.target.value)}
                className="form-control"
                defaultValue={rec.img_src}
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail3">PRODUCT NAME</label>
              <input
                type="text"
                onChange={(event) => setName(event.target.value)}
                defaultValue={rec.product_name}
                className="form-control"
                id="exampleInputEmail3"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Product PRICE</label>
              <input
                type="text"
                onChange={(event) => setPrice(event.target.value)}
                defaultValue={rec.product_price}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            {disable === false ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={EditMyProduct}
              >
                UPDATE
              </button>
            ) : (
              <div className="spinner-border text-danger" role="status"></div>
            )}
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
