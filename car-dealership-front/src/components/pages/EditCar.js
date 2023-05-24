import '../../css/pages/buy.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function EditCar(props) {
  
  const location = useLocation();
  const { car } = location.state;
  const [editCar,setCar] = useState(car);
  let [photoNum, setPhotoNum] = useState(0);
  const[photo, setPhoto]=useState();
  const [newPhoto, setNewPhoto]=useState();
  const [photoCount,setPhotoCount] = useState(Object.keys(editCar.carPhotos).length-1);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempCar = { ...editCar};
    tempCar[name] = value;
    setCar(tempCar)
    }
    const photoChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempPhoto = { ...newPhoto};
        tempPhoto[name] = value;
        setNewPhoto(tempPhoto)
        }

    const nextPhotoClick = () =>{
        if(photoCount !== photoNum){
          setPhotoNum(photoNum+1)
        }
        else{
          setPhotoNum(0)
          }
    }
    const prevPhotoClick = () =>{
       if(photoNum===0){
        setPhotoNum(photoCount)
        
      }else{
        setPhotoNum(photoNum-1)
      
      }

    }
  
    
    const deletePhotoClick = () =>{
        setPhoto = editCar.carPhotos[photoNum];
        axios.delete(`http://localhost:8080/car/deletePhoto/${editCar.id}`,photo)
        setPhotoCount=(photoCount-1)
        prevPhotoClick();
    }

    const addPhotoClick = (event) =>{
        event.preventDefault();
        axios.post(`http://localhost:8080/car/addPhoto/${editCar.id}`,newPhoto)
        setPhotoCount=(photoCount+1)
    }


  const handleUpdateClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/car/updateCar", editCar)
      .then((response) => {

        setCar(response.data);
        navigate("/Admin")
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="car-edit-box">
      <div className='flex-row'><h1 className = 'center'>EditCar</h1></div>
   
        <img className = 'picture-box' src={editCar.carPhotos[photoNum].photoUrl} alt={car.model} />
        <div className = 'flex-row center'>
        <button onClick={deletePhotoClick}>DELETE</button>
        <button onClick={nextPhotoClick}>NEXT</button>
        <button onClick={prevPhotoClick}>PREVIOUS</button>
        </div>

        <div className='flex-row center'>
        IMAGE URL:
        <input className = 'input-container' value={editCar.carPhotos[photoNum].photoUrl} name='description' type='description' onChange={changeHandler} required></input>
        </div>
    
        <div className='flex-row center'>
        DESCRIPTION:
        <input className = 'input-container' value={editCar.description} name='description' type='description' onChange={changeHandler} required></input>
        </div>
        <div className='flex-row center'>
        MAKE:
        <input className = 'input-container' value={editCar.make} name='make' type='make' onChange={changeHandler} required></input>
        </div>
        <div className='flex-row center'>
        MODEL:
        <input className = 'input-container' value={editCar.model} name='model' type='model' onChange={changeHandler} required></input>
        </div>
        <div className='flex-row center'>
        YEAR:
        <input className = 'input-container' value={editCar.year} name='year' type='year' onChange={changeHandler} required></input>
        </div>
        <div className='flex-row center'>
        MILES:
        <input className = 'input-container' value={editCar.miles} name='miles' type='miles' onChange={changeHandler} required></input>
        </div>
        <div className='flex-row center'>
        PRICE:
        <input className = 'input-container' value={editCar.price} name='price' type='price' onChange={changeHandler} required></input>
        </div>
        <div>
        <button onClick={handleUpdateClick}>Update</button>
        </div>
        <div className='flex-row center'>
        ADD PHOTO URL:
        <input className = 'input-container' name='photoUrl' type='photoUrl' onChange={photoChangeHandler} required></input>
        </div>
        <div>
        <button onClick={addPhotoClick}>Add Photo</button>
        </div>
    </div>
      



  )
}

export default EditCar;