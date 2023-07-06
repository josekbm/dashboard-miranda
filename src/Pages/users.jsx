import React from 'react'
import { useEffect } from 'react'
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
  Available,
  Booked,
} from './RoomStyled'
import Table from '../Components/Table'
import { RiPhoneFill } from 'react-icons/ri'
import { RiMailLine } from 'react-icons/ri'   
import { fetchUsers, selectUsers } from '../Features/userSlice'

export function Users() {

  const dispatch = useDispatch();
  
  const data = useSelector(selectUsers);

  useEffect(() => {dispatch(fetchUsers())})
  
  
  
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

