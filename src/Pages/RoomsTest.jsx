import React, {useEffect} from 'react'

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
import { fetchRooms, selectRooms } from '../Features/roomSlice'
import { Link } from 'react-router-dom'
import Table2 from '../Components/Table2'
import RoomsData from "../Data/roomsData.json"

export function Rooms() {

  
  return (
    <>
    <Table2 data={RoomsData}/>
    </>
  )
}