import { useEffect } from "react";

export function RazorPay({ total, setRazorId }) {
  const options = {
    key: "rzp_test_dyP2tDc02brepS",
    amount: Number(total) * 100,
    name: "PK's ONLINE SHOPPING",
    description: "",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      setRazorId(response.razorpay_payment_id);
      alert("Payment successfully done , now click to book button");
    },
    prefill: {
      name: "",
      contact: "",
      email: ""
    },
    notes: {
      address: ""
    },
    theme: {
      color: "blue",
      hide_topbar: false
    }
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => openPayModal()}
        type="button"
      >
        RazorPay
      </button>
      <br />
      <br />
    </>
  );
}
