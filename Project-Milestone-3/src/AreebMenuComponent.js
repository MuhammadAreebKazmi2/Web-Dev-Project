import React from "react";
import {useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'

import "./menustyle.css";

const MenuComponent = () => {
 // const [searchQuery, setSearchQuery] = useState("");

 //hook used for navigating ot other screen
  const navigate = useNavigate();

//array of all the items 
  const menuItems = [
    { 
      category: "Ice Cream",
      color: "pink", 
      items: [
        { name: "Chocolate Chip", price: "300", img: "./chocolate_chip.png", description: "Scoop of rich and decadent chocolate ice cream" }, 
        { name: "Blackberry", price: "200", img: "./blackberry.png", description: "Scoop of smooth and silky blueberry ice cream" }
      ] 
    },
    { 
      category: "Waffles", 
      color: "brown",
      items: [
        { name: "Ice-o-waffle", price: "650", img: "./chocolate_waffle.png", description: "Belgian waffle topped with nutella, fudge sauce and a scoop of ice cream" }, 
        { name: "Cream-o-waffle", price: "500", img: "./cream_waffle.png", description: "Scrumptious belgian waffle topped with whipped cream and a bunch of fresh strawberries" }
      ] 
    },
    { 
      category: "Shakes", 
      color: "purple",
      items: [
        { name: "Oreo Shake", price: "750", img: "./oreo_shake.png", description: "The taste of oreos, you will never forget"}, 
        { name: "Strawberry Shake", price: "600", img: "./strawberry_shake.png", description: "Refreshing strawberry blend with creamy texture and a sweet finish" },
        { name: "Chocolate Bliss Shake", price: "400", img: "./chocolate_shake.jpg", description: "Rich and creamy chocolate shake, perfect for chocolate lovers" }
      ] 
    },
    { 
      category: "Brownies", 
      color: "green",
      items: [
        { name: "Fudge Brownie", price: "350", img: "./fudge_brownie.png", description: "Rich brownie with a gooey fudge center" }, 
        { name: "Caramel Brownie", price: "400", img: "./caramel_brownie.png", description: "Soft and indulgent brownie topped with sweet, buttery caramel" }
      ] 
    },
    


  ];

 
//when an item is clicked goes to that item detail
  const handleItemClick = (item) => {
    navigate(`/ItemModal`, { state: { item } }); 
  };

  // const handleSearch = (event) => {
  //   if (event.key !== "Enter") return;
  //   let found = false;
  //   menuItems.forEach((section) => {
  //     section.items.forEach((item) => {
  //       if (item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
  //         document.getElementById(item.name)?.scrollIntoView({ behavior: "smooth" });
  //         found = true;
  //       }
  //     });
  //   });
  //   if (!found) alert("Item not found in the menu.");
  // };

  return (
    <div>
      
      {/* <header>
        <nav>
          <h1 className="logo">Sweet Treats</h1>
          <ul>
            <li><button>Home</button></li>
            <li><button>Menu</button></li>
            <li><button>About Us</button></li>
            <li><button>Contact Us</button></li>
          </ul>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            onKeyUp={handleSearch} 
          />
        </nav>
      </header> */}

{/* this is looping over the array of menu items
and putting it on the screen  */}
     {/*loop over the sections of the menu */}
     {menuItems.map((section, index) => (
        <section key={index} id={section.category.toLowerCase().replace(" ", "-")}>
          <h2 className={`section-title ${section.color}`}>{section.category}</h2>
          <div className="menu-items">
            {/*loop over each item in the section */}
            {section.items.map((item) => (
              <div
                className="item"
                key={item.name}
                onClick={() => handleItemClick(item)} // Navigate to ItemModal on click
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
