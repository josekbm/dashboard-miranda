import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Select } from '../Components/Select'
import { 
  MainContainer,
  OptionsContainer,
  ButtonsContainer,
  RoomName,
  RoomInfo,
  AddRoom,
  Available,
  NoData,
  DeleteButton
} from './RoomStyled'
import Table from '../Components/Table'
import { fetchContacts, getContactsData } from '../Features/contactSlice'
import { Contact } from '../interfaces'

export function Contacts() {

  const dispatch = useAppDispatch();
  
  const data = useAppSelector(getContactsData);

  useEffect(() => {dispatch(fetchContacts())})
  
  
  
  const cols = [
    {property: 'image', label: 'Date', display: (row: Contact) => (
        <RoomName>
          
            <RoomInfo>
              <span>
                {row.date}
              </span>
              <span>
                - Hour {row.date}
              </span>
            </RoomInfo>          
        </RoomName>
      )},
      {property: 'image', label: 'Customer', display: (row: Contact) => (
        <RoomName>
          
            <RoomInfo>
              <p>
                {row.customer.name}
              </p>
              <p>
                Email: {row.customer.email}
              </p>
              <p>
                Phone: {row.customer.phone}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      {property: 'Topic', label: 'Topic'},
      { property: 'message_content', label: 'Content', display: (row: Contact) => 
        row.comment.length > 0 ? <Available>View Note</Available> : <NoData>No amenities</NoData>
        
      },
      { property: 'deleteRoom', label: '', display: (row: Contact) =>
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

