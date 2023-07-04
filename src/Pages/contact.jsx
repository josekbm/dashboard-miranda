import React from 'react'
import FilterTable from '../Components/FilterTable'
import { FilterContainer } from '../Components/FilterTableStyle'
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
import roomsData from "../Data/roomsData2.json"

export function Contact() {

  const data = roomsData;
  
  const tableFilters = [
    {name: "All Rooms"},
    {name: "Available Rooms"},
    {name: "Booked Rooms"},
  ]
  
  const cols = [
    {property: 'image', label: 'Room', display: (row) => (
        <RoomName>
          <RoomImg>
            <img src={row.photo} alt={row.id} />
          </RoomImg>
            <RoomInfo>
              <p>
                #{row.id}
              </p>
              <p>
                {row.number}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'type', label: 'Room Type' },
      { property: 'amenities', label: 'Amenities', display: (row) =>
        row.amenities?
          <p>{row.amenities}</p>
        :  
          <NoData>No amenities</NoData>
      },
      { property: 'price', label: 'Price', display: (row) => 
        <Price>${row.price} <span>/night</span></Price>
      },
      { property: 'offer', label: 'Offer Price', display: (row) => 
          row.offer?
            <OfferPrice>
              <p>{row.offer}%</p>
              <p>{row.price-(row.price*(row.offer/100))}</p>
            </OfferPrice>
          :
            <NoData>
              No offer
            </NoData>
      },
      { property: 'status', label: 'Status', display: (row) => 
        row.status? 
          <Available>Available</Available>
        :
          <Booked>Booked</Booked>  
      },
      { property: 'deleteRoom', label: '', display: (row) =>
        <DeleteButton>Delete</DeleteButton>
      }
  ]

  return (
    <MainContainer>
    <OptionsContainer>
      <FilterContainer>
        <FilterTable filters={tableFilters}/>
      </FilterContainer>
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

