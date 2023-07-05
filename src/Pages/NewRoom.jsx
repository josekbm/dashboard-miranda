import React, {useEffect, useState} from 'react'
import { MainContainer, FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormRoomContainer, ImgInput, OfferContainer } from './NewRoomStyled'
import { useDispatch } from 'react-redux';
import { roomCreate } from '../Features/roomSlice';

function NewRoom() {

    const dispatch = useDispatch()

    const [img, setImg] = useState([]);

    const [imgURL, setImgURL] = useState([]);

    const [type,setType] = useState();

    const [price,setPrice] = useState();

    const [number,setNumber] = useState();

    const [discount,setDiscount] = useState();

    const [description,setDescription] = useState();

    const [offer,setOffer] = useState();

    const [cancellation,setCancellation] = useState();

    const [amenities,setAmenities] = useState();

    useEffect(() => {
        if(img.length>0){
            let arrAux = [];
            for(let i = 0; i<img.length;i++){
                arrAux.push(URL.createObjectURL(img[i]))
            }
            setImgURL(arrAux)
        }else{
            setImgURL([])
        }
    },[img])

    const handleImageChange = (event) => {
        setImg(event.target.files)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleOfferChange = (e) => {
        setOffer(e.target.value)
    }

    const handleCancellationChange = (e) => {
        setCancellation(e.target.value)
    }

    const handleAmenitiesChange = (e) => {
        setAmenities(e.target.value)
    }

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const newRoom = {
            type: type,
            price: price,
            number: number,
            discount: discount,
            description: description,
            offer: offer,
            cancellation: cancellation,
            amenities: amenities
        }

        for(let key in newRoom){
            if(!newRoom[key]){
                return alert("Something empty")
            } 
        }

        dispatch(roomCreate(newRoom))
    }

  return (
    <MainContainer>
        <FormRoomContainer onSubmit={handleSubmit}>
            <FormHeader>
                {
                    img.length>=3?
                        imgURL.map((item, i) => 
                            <FormPhoto key={i}>
                                <img src={item} alt={'roomPhoto'}/>
                            </FormPhoto>    
                        )
                    :
                    <>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                    </>
                }
            </FormHeader>
            <ImgInput
                type="file" 
                name="photos" 
                id="photos" 
                accept="image/png, image/jpeg" 
                multiple 
                onChange={handleImageChange}
            />
            <FormMain>
                <div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" onChange={handleTypeChange}>
                            <option value="singleBed">Single Bed</option>
                            <option value="doubleBed">Double Bed</option>
                            <option value="doubleSuperior">Double Superior</option>
                            <option value="suite">Suite</option>    
                        </select>
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <input type="number" name="number" id="number" onChange={handleNumberChange}/>
                    </div>
                    <div>
                        <label htmlFor="descripion">Description</label>
                        <textarea name="description" id="description" style={{resize: 'none'}} onChange={handleDescriptionChange}></textarea>
                    </div>
                    <OfferContainer>
                        <label htmlFor="offer">Offer</label>
                        <div onChange={handleOfferChange}>
                            <div>
                                Yes <input type="radio" name="offer" id="yesOffer" />
                            </div>
                            <div>
                                No <input type="radio" name="offer" id="noOffer" />
                            </div>                            
                        </div>                
                    </OfferContainer>
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" onChange={handlePriceChange}/>
                    </div>
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <input type="number" name="discount" id="discount" onChange={handleDiscountChange}/>
                    </div>
                    <div>
                        <label htmlFor="cancellation">Cancellation</label>
                        <textarea name="cancellation" id="cancellation" style={{resize: 'none'}} onChange={handleCancellationChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="amenities">Amenities</label>
                        <select name="amenities" id="amenities" onChange={handleAmenitiesChange} defaultValue="">
                            <option value="" disabled>Select an option</option>
                            <option value="tv">TV</option>
                            <option value="bar">Bar</option>
                            <option value="bar">WiFi</option>
                            <option value="bar">Shower</option>
                            <option value="bar">Coffee Set</option>
                            <option value="bar">Sofa</option>
                            
                        </select>
                    </div>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn type='submit' value="Create Room" style={{padding: "10px 20px"}} onSubmit={handleSubmit}/>
            </FormFooter>
        </FormRoomContainer>
    </MainContainer>
  )
}

export default NewRoom