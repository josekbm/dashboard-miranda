import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../app/hooks'
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
import { fetchUsers, getUsersData } from '../Features/userSlice'
import { User } from '../interfaces'

export function Users() {

  const dispatch = useAppDispatch();
  
  const data = useAppSelector(getUsersData);

  useEffect(() => {dispatch(fetchUsers())})
  
  
  
  const cols = [
    {property: 'image', label: 'User', display: (row: User) => (
        <RoomName>
          <RoomImg>
            <img src={row.photo} alt={row.id} />
          </RoomImg>
            <RoomInfo>
              <p>
                #{row.id}
              </p>
              <p>
                {row.name}
              </p>
              <p>
                Joined on {row.startDate}
              </p>
            </RoomInfo>          
        </RoomName>
      )},
      { property: 'position', label: 'Role' },
      { property: 'amenities', label: 'Contact', display: (row: User) =>(
        <RoomInfo>
          <p>
          <RiMailLine/> {row.email}
          </p>
          <p>
          <RiPhoneFill/> {row.phone}
          </p>
        </RoomInfo>         
      )},
      
      { property: 'status', label: 'Status', display: (row: User) => 
        row.state === "ACTIVE" ?
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

