import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ useContext hook to access the actual value from the Provider
  const context = useContext(GeneralContext);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    setStockQuantity(qty);
  };

  const handleSellClick = async () => {
    if (!stockQuantity || stockQuantity <= 0) {
      alert("Enter a valid quantity to sell.");
      return;
    }

    if (!stockPrice || stockPrice <= 0) {
      alert("Enter a valid price.");
      return;
    }


    const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3002"
      : "https://niveshak-backend.onrender.com";

    try {
      const res = await axios.post(`${API_BASE_URL}/sellOrder`, {
        name: uid,
        qty: stockQuantity,
        price: parseFloat(stockPrice),
        mode: "SELL",
      });

      alert(res.data.message || "Sell order placed!");
      context.closeSellWindow(); // ✅ now safe and works!
    } catch (err) {
      alert(err.response?.data?.error || "Sell failed.");
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    context.closeSellWindow(); // ✅ also safe
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={handleQuantityChange}
              value={stockQuantity}
              min={1}
            />
          </fieldset>
          <fieldset>
            <legend style={{ color: "black" }}>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(parseFloat(e.target.value))}
              value={stockPrice}
              min={0.01}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button className="btn btn-orange" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
