import '../../css/pages/buy.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function Auction(props) {
 
    const location = useLocation();
    const { car } = location.state;
    const [bidPrice, setBidPrice] = useState(0.0);
    
    const navigate = useNavigate();
  
    const handleBidChange = (event) => {
        setBidPrice(event.target.value);
      };

    const handleBidClick = (event) => {
      event.preventDefault();
      axios
        .post(`http://localhost:8080/user/bidOnCar/${props.user.id}/${car.id}/${bidPrice}`)
        .then((response) => {
          localStorage.setItem("userId", response.data.id)
          props.setUser(response.data);
          navigate("/")
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
    return (
      <div className='buy-content'>
        <div>AUCTION HOUSE!</div>
        <div className='checkout-box'>
          <img src={car.carPhotos[0].photoUrl} alt={car.model} />
          DESCRIPTION: {car.description}
          MAKE: {car.make}
          MODEL: {car.model}
          YEAR: {car.year}
          MILES: {car.miles}
          DATE ADDED:{car.dateAdded}
          PRICE: {car.price}
          <input
          type='text'
          value={bidPrice}
          onChange={handleBidChange}
          placeholder='Place Bid'
        />
          <button onClick={handleBidClick}>PLACE BID</button>
        </div>
      </div>
  
  
    )
}

export default Auction

