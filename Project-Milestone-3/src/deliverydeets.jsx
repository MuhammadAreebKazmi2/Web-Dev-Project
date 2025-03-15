import React from 'react';

function DeliveryDetails({ deliveryInfo, setDeliveryInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  return (
    <div className="delivery-details">
      <h3>Delivery Details</h3>
      <label>
        Delivering to:
        <input
          type="text"
          name="deliveringTo"
          value={deliveryInfo.deliveringTo}
          onChange={handleChange}
        />
      </label>
      <label>
        Delivery Type:
        <select
          name="deliveryType"
          value={deliveryInfo.deliveryType}
          onChange={handleChange}
        >
          <option value="Standard">Standard</option>
          <option value="Express">Express</option>
        </select>
      </label>
    </div>
  );
}

export default DeliveryDetails;
