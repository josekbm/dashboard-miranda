import { getRoomsData, getRoomsStatus } from "../../Features/roomSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../Features/roomSlice";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { useState } from "react";
import {
  ImageItem,
  LeftActions,
  RoomImageItem,
  StyledLink,
  TableContainer,
  TableItem,
  TableRow,
  TableTitle,
} from "../../Components/TableStyled";
import { Button, StatusButton } from "../../Components/Button";
import { offerPriceCalc } from "../../Features/otherFunctions";
import {
  CustomDropdown,
  RightActions,
  TableActions,
} from "../../Components/TableStyled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";

export const Rooms = () => {
  const dispatch = useAppDispatch();
  const roomsStatus = useAppSelector(getRoomsStatus);
  const roomsData = useAppSelector(getRoomsData);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(roomsData);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tableTitles = [
    "Room Name",
    "Amenities",
    "Price",
    "Offer Price",
    "Status",
    "Details",
    "Delete",
  ];

  const options = [
    "ID",
    "Room Number",
    "State",
    "Lowest Price",
    "Highest Price",
  ];

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
    setTableData(roomsData);
  }, [dispatch, roomsStatus, roomsData]);

  const onChangeHandler = (e: any) => {
    if (e.value === "ID") {
      setTableData(roomsData);
    }
    if (e.value === "Room Number") {
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.roomNumber < b.roomNumber) return -1;
          if (a.roomNumber > b.roomNumber) return 1;
          return 0;
        })
      );
    }
    if (e.value === "State") {
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.status === "AVAILABLE") return -1;
          if (a.status === "BOOKED") return 1;
          return 0;
        })
      );
    }

    if (e.value === "Lowest Price") {
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        })
      );
    }

    if (e.value === "Highest Price") {
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        })
      );
    }
  };
  if (roomsStatus === "rejected") {
    return <NotFound />;
  } else {
    if (roomsStatus === "fulfilled" && tableData.length > 0) {
      return (
        <>
          <TableActions>
            <LeftActions></LeftActions>
            <RightActions>
              <Button
                onClick={() => {
                  setShowCreateModal(true);
                }}
              >
                + New{" "}
              </Button>
              <CustomDropdown
                arrowOpen={<MdOutlineKeyboardArrowUp />}
                arrowClosed={<MdOutlineKeyboardArrowDown />}
                options={options}
                onChange={onChangeHandler}
                value={"ID"}
                room
              />
            </RightActions>
          </TableActions>
          <TableContainer>
            <thead>
              <TableTitle>
                {tableTitles.map((element) => (
                  <th key={tableTitles.indexOf(element)}>{element}</th>
                ))}
              </TableTitle>
            </thead>
            <tbody>
              {tableData.map((element) => (
                <TableRow key={element.id}>
                  <TableItem>
                    <ImageItem>
                      <RoomImageItem src={element.thumbnail} alt="room" />
                      <div>
                        {element.roomType + "-" + element.roomNumber}
                        <p>{element.id}</p>
                      </div>
                    </ImageItem>
                  </TableItem>
                  <TableItem>
                    <p>{element.amenities.join(", ")}</p>
                  </TableItem>
                  <TableItem price discount={element.discount}>
                    {element.price + "$"} <p>{"/per night"}</p>
                  </TableItem>
                  <TableItem offer discount={element.discount}>
                    {offerPriceCalc(element.price, element.discount)}
                    <p>{element.discount > 0 ? "/per night" : ""}</p>
                  </TableItem>
                  <TableItem>
                    <StatusButton status={element.status}>
                      {element.status}
                    </StatusButton>
                  </TableItem>
                  <TableItem>
                    <StyledLink to={`/rooms/${element.id}`}>
                      <AiOutlineInfoCircle />
                    </StyledLink>
                  </TableItem>
                  <TableItem>
                    <VscTrash
                      onClick={() => {
                        setShowDeleteModal(true);
                        setTargetId(element.id);
                      }}
                    />
                  </TableItem>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
          <Modal
            mode="delete"
            page={"rooms"}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={targetId}
          />
          <Modal
            mode="create"
            page={"rooms"}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
        </>
      );
    } else {
      return (
        <>
          <Wrapper>
            <PropagateLoader color="#407957" size={15} />
          </Wrapper>
        </>
      );
    }
  }
};
