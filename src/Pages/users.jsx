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
  Available,
  Booked,
} from './RoomStyled'
import Table from '../Components/Table'
import usersData from "../Data/usersData.json"
import { RiPhoneFill } from 'react-icons/ri'
import { RiMailLine } from 'react-icons/ri'   

export function Users() {

  const data = usersData;
  
  const tableFilters = [
    {name: "All Employee"},
    {name: "Active Employee"},
    {name: "Inactive Employee"},
  ]
  
  const cols = [
    {property: 'image', label: 'User', display: (row) => (
        <RoomName>
          <RoomImg>
            <img src={row.pic} alt={row.id} />
          </RoomImg>
            <RoomInfo>
              <p>
                #{row.employee_id}
              </p>
              <p>
                {row.full_name}
              </p>
              <p>
                Joined on {row.start_date}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'position', label: 'Role' },
      { property: 'amenities', label: 'Contact', display: (row) =>(
        <RoomInfo>
          <p>
          <RiMailLine/> {row.email}
          </p>
          <p>
          <RiPhoneFill/> {row.contact}
          </p>
        </RoomInfo>         
      )},
      
      { property: 'status', label: 'Status', display: (row) => 
        row.status === "Active" ?
          <Available>Active</Available>
        :
          <Booked>Inactive</Booked>  
      },
      
  ]

  return (
    <MainContainer>
    <OptionsContainer>
      <FilterContainer>
        <FilterTable filters={tableFilters}/>
      </FilterContainer>
      <ButtonsContainer>
        <AddRoom>
          + New Employee                
        </AddRoom>
        <Select />          
      </ButtonsContainer>
      </OptionsContainer>
      <Table data={data} cols={cols} />
    </MainContainer>
  )
}

