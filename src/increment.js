export function Increment({ email, name, setChange }) {
  function Update() {
    setChange(false);
    fetch("https://pk-onlineshopping.herokuapp.com/user/incrementcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      },
      body: JSON.stringify({
        email_id: email,
        product_name: name
      })
    })
      .then((data) => data.json())
      .then((data) => {
        setChange(true);
      });
  }

  return (
    <div style={{ display: "inline" }}>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => Update()}
      >
        +
      </button>
    </div>
  );
}
