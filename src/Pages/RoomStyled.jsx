import styled from 'styled-components';

export const MainContainer = styled.div`
    font-family: "Poppins";
    color: #393939;
`

export const OptionsContainer = styled.div`
    display: flex;
    max-height: 49px;
    justify-content: space-between;
`
export const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
`

export const AddRoom = styled.button`
    border: none;
    border-radius: 12px;
    background-color: #135846;
    color: white;
    font-family: "Poppins";
    padding: 13px 60px;
    cursor: pointer;
    
`
export const RoomName = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
`

export const RoomImg = styled.div`
    width: 150px;
    height: 77px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
`

export const RoomInfo = styled.div`
    p{
        font-size: 16px;


        &:first-child{
        font-size: 14px;
        color: #799283;
    }
    }
`

export const OfferPrice = styled.div`
    p{
        font-size: 18px;
        color: green;
        &:first-child{
            font-size: 12px;
            color: red;
        }
    }

`

export const NoData = styled.p`
    color: #a3a3a3;
`

export const Available = styled.p`
    background-color: #5AD07A;
    color: white;
    padding: 10px 7px;
    text-align: center;
    border-radius: 12px;
`

export const Booked = styled.p`
    color: white;
    background-color: #E23428;
    padding: 10px 7px;
    text-align: center;
    border-radius: 12px;
`

export const Price = styled.p`
    color: #212121;
    font-weight: 600;

    span{
        color: #799283;
        font-size: 14px;
        font-weight: 400;
    }
`

export const DeleteButton = styled.button`
    padding: 5px 10px;
    color: red;
    background-color: #FFEDEC;
    border-radius: 8px;
    border: none;
    cursor: pointer;
`



