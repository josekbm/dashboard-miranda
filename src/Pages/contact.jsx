import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  DeleteButton
} from './RoomStyled'
import Table from '../Components/Table'
import contactData from "../Data/contactData.json"
import { fetchContacts, selectContacts } from '../Features/contactSlice'

export function Contact() {

  const dispatch = useDispatch();
  
  const data = useSelector(selectContacts);

  useEffect(() => {dispatch(fetchContacts())})
  
  
  
  const cols = [
    {property: 'image', label: 'Date', display: (row) => (
        <RoomName>
          
            <RoomInfo>
              <span>
                {row.message_date}
              </span>
              <span>
                - Hour {row.message_hour}
              </span>
            </RoomInfo>          
        </RoomName>
      )},
      {property: 'image', label: 'Customer', display: (row) => (
        <RoomName>
          
            <RoomInfo>
              <p>
                {row.customer}
              </p>
              <p>
                Email: {row.customer_mail}
              </p>
              <p>
                Phone: {row.customer_phone}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      {property: 'Topic', label: 'Topic'},
      { property: 'message_content', label: 'Content', display: (row) => 
        row.message_content.length > 0 ? <Available>View Note</Available> : <NoData>No amenities</NoData>
        
      },
      { property: 'deleteRoom', label: '', display: (row) =>
        <DeleteButton>Archive</DeleteButton>
      }
  ]

  return (
    <MainContainer>
    <OptionsContainer>
      
      <ButtonsContainer>
        <AddRoom>
          + New Room                
        </AddRoom>
        <Select />          
      </ButtonsContainer>
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
  )
}

