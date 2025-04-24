import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./menustyle.css";

const MenuComponent = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the received data
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleItemClick = (item) => {
    navigate(`/ItemModal`, { state: { item } });
  };

  if (loading) {
    return <p>Loading menu items...</p>;
  }

  if (error) {
    return <p>Error loading menu: {error}</p>;
  }

  if (menuItems.length === 0) {
    return <p>No menu items available.</p>;
  }

  return (
    <div>
      {Object.keys(groupedItems).map((category, index) => (
        <section key={index} id={category.toLowerCase().replace(" ", "-")}>
          <h2 className={`section-title`}>{category}</h2>
          <div className="menu-items">
            {groupedItems[category].map((item) => (
              <div
                className="item"
                key={item._id}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.img} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">Rs {item.price}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuComponent;