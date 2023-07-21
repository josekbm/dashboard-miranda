import { useEffect } from 'react'
import { Select } from '../Components/Select'
import { 
  MainContainer,
  OptionsContainer,
  ButtonsContainer,
  RoomName,
  RoomImg,
  RoomInfo,
  AddRoom,
  OfferPrice,
  Available,
  Booked,
  Price,
  NoData,
  DeleteButton,
} from './RoomStyled'
import Table from '../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteRoom, fetchRooms, getRoomsData } from '../Features/roomSlice'
import { Link } from 'react-router-dom'
import { Room } from '../interfaces'

export function Rooms() {

  const dispatch = useAppDispatch();
  
  const data = useAppSelector(getRoomsData);

  const handleDeleteRoom = (id: number) => {
    dispatch(deleteRoom("id"))
  }

  

  useEffect(() => {dispatch(fetchRooms())})

  
  
  
  
  
  const cols = [
    {property: 'image', label: 'Room', display: (row: Room) => (
        <RoomName>
          <RoomImg>
            <img src={row.thumbnail} alt={row.id} />
          </RoomImg>
            <RoomInfo>
              <p>
                #ID: {row.id}
              </p>
              <p>
                {row.roomNumber}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'type', label: 'Room Type' },
      { property: 'amenities', label: 'Amenities', display: (row: Room) =>
        row.amenities?
          <p>{row.amenities}</p>
        :  
          <NoData>No amenities</NoData>
      },
      { property: 'price', label: 'Price', display: (row: Room) => 
        <Price>${row.price} <span>/night</span></Price>
      },
      { property: 'offer', label: 'Offer Price', display: (row: Room) => 
          row.discount?
            <OfferPrice>
              <p>{row.discount}%</p>
              <p>{row.price-(row.price*(row.discount/100))}</p>
            </OfferPrice>
          :
            <NoData>
              No offer
            </NoData>
      },
      { property: 'status', label: 'Status', display: (row: Room) => 
        row.status? 
          <Available>Available</Available>
        :
          <Booked>Booked</Booked>  
      },
      { property: 'deleteRoom', label: '', display: (row: Room) =>
      <DeleteButton onClick={()=>handleDeleteRoom(parseInt(row.id))}>Delete </DeleteButton>
      }
  ]

  return (
    <>
    <MainContainer>
    <OptionsContainer>
      
      <ButtonsContainer>
        <AddRoom>
          <Link to="/SingleRoom">
          +New Room
          </Link>            
        </AddRoom>
        <Select />          
      </ButtonsContainer>
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
    </>
  )
}

