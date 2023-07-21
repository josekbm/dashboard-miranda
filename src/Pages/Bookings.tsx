import {useEffect} from 'react'
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
  InProgress,
} from './RoomStyled'
import Table from '../Components/Table'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchBookings, getBookingsData } from '../Features/bookingSlice'
import { Booking } from '../interfaces'


export function Bookings() {

  const dispatch = useAppDispatch();
  
  const data = useAppSelector(getBookingsData);

  useEffect(() => {dispatch(fetchBookings())})  
  
  const cols = [
    {property: 'guest', label: 'Guest', display: (row: Booking) => (
        <RoomName>
          
            <RoomInfo>
              <p>
                {row.guest_name}
              </p>
              <p>
                #ID {row.booking_id}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'booking_date', label: 'Booking Date' },
      { property: 'check_in', label: 'Check In' },
      { property: 'check_out', label: 'Check Out' },
      { property: 'special_requests', label: 'Special Request', display: (row: Booking) =>
        row.special_requests?
        <Available>View Note</Available>
        :  
          <NoData>No special request</NoData>
      },
      { property: 'room_type', label: 'Room Type' },
      { property: 'status', label: 'Status', display: (row: Booking) => 
        {if(row.status === "Check In") {
          return <Available>Check in</Available>
        }else if (row.status === "Check Out"){
          return <Booked>Check Out</Booked>
        }else if (row.status === "In Progress"){
          return <InProgress>In Progress</InProgress>
        }}  
      },
      
      
  ]

  return (
    <>
    <MainContainer>
    <OptionsContainer>
      
      <ButtonsContainer>
        <AddRoom>
          <Link to="/NewBooking">
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