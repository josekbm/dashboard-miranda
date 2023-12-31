import { ArchiveButton, Button } from "./Button";
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled";
import { IoClose } from "react-icons/io5";
import { addUser, deleteUser, fetchUsers} from "../Features/userSlice";
import { addBooking, deleteBooking, fetchBookings, resetBookingsState } from "../Features/bookingSlice";
import { addRoom, deleteRoom, fetchRooms } from "../Features/roomSlice";
import {
  FormContainer,
  Input,
  InputBig,
  Label,
  RadioInput,
} from "./FormStyled";
import {
  dateConverter,
  getTodayString,
  jobDescriptionChooser,
  roomInfoChooser,
} from "../Features/otherFunctions";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import {
  ReviewComment,
  ReviewInfo,
} from "./LastReviewsStyled";
import { useAppDispatch } from "../app/hooks";
import { Booking, Contact } from "../interfaces";
import { useNavigate } from "react-router";
import { toastWarning, toastSuccess } from "../Features/toastify";

interface ModalProps {
  mode?: string,
  page?: string,
  itemId?: string,
  setShowDeleteModal?: Dispatch<SetStateAction<boolean>>,
  setShowCreateModal?: Dispatch<SetStateAction<boolean>>,
  showDeleteModal?: boolean,
  showCreateModal?: boolean,
  showModal?: boolean,
  setShowModal?: Dispatch<SetStateAction<boolean>>,
  target?: Contact,
  showNotesModal?: boolean,
  setShowNotesModal?: Dispatch<SetStateAction<boolean>>,
  targetBooking?: Booking,
}
export const Modal = ({page, itemId, setShowDeleteModal, setShowCreateModal, showDeleteModal, showCreateModal, mode, target, showModal, setShowModal, showNotesModal, setShowNotesModal, targetBooking} : ModalProps) => {
  const dispatch = useAppDispatch();
  const [fieldError, setFieldError] = useState("");
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("Manager");
  const [userEmail, setUserEmail] = useState("");
  const [userStartDate, setUserStartDate] = useState(getTodayString());
  const [userImage, setUserImage] = useState(
    "https://randomuser.me/api/portraits/lego/5.jpg"
  );
  const [userState, setUserState] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSalt, setUserSalt] = useState("");

  const [guestName, setGuestName] = useState("");
  const [orderDate, setOrderDate] = useState(getTodayString());
  const [bookingRoomId, setBookingRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [roomType, setRoomType] = useState("Single Bed");
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [roomStatus, setRoomStatus] = useState("");
  const [description, setDescription] = useState("");

  const onClickDeleteHandler = () => {
    if (page === "users" && setShowDeleteModal && itemId) {
      dispatch(deleteUser(itemId)).then(()=> {
        dispatch(fetchUsers())
        toastSuccess("User Deleted!")
      });
      navigate("/users")
      setShowDeleteModal(false);
    }

    if (page === "bookings" && setShowDeleteModal && itemId) {
      dispatch(deleteBooking(itemId)).then(()=> {
        dispatch(fetchBookings())
        toastSuccess("Booking Deleted!")
      });
      navigate("/bookings")
      setShowDeleteModal(false);
    }

    if (page === "rooms" && setShowDeleteModal && itemId) {
      dispatch(deleteRoom(itemId)).then(()=> {
        dispatch(fetchRooms())
        toastSuccess("Room Deleted!")
      });
      navigate("/rooms");
      dispatch(resetBookingsState());
      setShowDeleteModal(false);
    }
  };

  const onCreateSubmitHandler = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (page === "users") {
      if (
        userEmail === "" ||
        userImage === "" ||
        userName === "" ||
        userPosition === "" ||
        userStartDate === "" ||
        userState === "" ||
        userPhone === "" ||
        userPassword === ""
      ) {
        toastWarning("It seems you miss enter some field!");
      } else {
        const user = {
          id: "",
          photo: userImage,
          name: userName,
          position: userPosition,
          email: userEmail,
          phone: userPhone,
          startDate: userStartDate,
          state: userState,
          jobDescription: jobDescriptionChooser(userPosition),
          password: userPassword,
          salt: userSalt
          
        };
        dispatch(addUser(user)).then(() => {
          dispatch(fetchUsers())
          toastSuccess("User created!")          
        })
        navigate("/users")
        
        if(setShowCreateModal){
          setShowCreateModal(false);
        }
        setFieldError("");
        setUserEmail("");
        setUserName("");
        setUserImage(
          "https://randomuser.me/api/portraits/lego/5.jpg"
        );
        const form = document.getElementById('createForm') as HTMLFormElement 
        form.reset();
        setUserPassword("");
        setUserSalt(user.salt);
        setUserPosition("Manager");
        setUserStartDate(getTodayString());
        setUserState("");
        setUserPhone("");
        
        
      }
    }
    if (page === "bookings") {
      event.preventDefault();
      if (
        guestName === "" ||
        checkIn === "" ||
        checkOut === "" ||
        orderDate === "" ||
        bookingRoomId === ""
      ) {
        toastWarning("It seems you miss enter some field!");
      } else {
        const booking = {
            name: guestName,
            id: "",
            orderDate: orderDate,
            checkIn: checkIn,
            checkOut: checkOut,
            specialRequest: specialRequest,
            room: bookingRoomId,
            status: "",
        };
        dispatch(addBooking(booking));
        toastSuccess("Booking created!")
        navigate("/bookings")
        if(setShowCreateModal){
          setShowCreateModal(false);
        }
        const form = document.getElementById('createForm') as HTMLFormElement 
        form.reset();
        setGuestName("");
        setBookingRoomId("");
        setCheckIn("");
        setCheckOut("");
        setRoomType("");
        setOrderDate(getTodayString());
        setSpecialRequest("");
        setFieldError("");
        
      }
    }
    if (page === "rooms") {
      if (
        roomNumber === "" ||
        roomType === "" ||
        price === undefined ||
        roomStatus === "" ||
        description === "" || discount === undefined
      ) {
        setDiscount(0);
        toastWarning("It seems you miss enter some field!");
      } else {
        const room = {
          id: "",
          roomType: roomType,
          roomNumber: roomNumber,
          price: price,
          discount: discount,
          status: roomStatus,
          amenities: roomInfoChooser(roomType).amenities,
          cancellation: roomInfoChooser(roomType).cancellation,
          thumbnail: roomInfoChooser(roomType).thumbnail,
          description: description,
          images: roomInfoChooser(roomType).images,
        };
        dispatch(addRoom(room));
        toastSuccess("Room created!")
        navigate("/rooms")
        if(setShowCreateModal){
          setShowCreateModal(false);
        }
        setRoomNumber("");
        setRoomType("Single Bed");
        setDiscount(undefined);
        setPrice(undefined);
        setDescription("");
        setRoomStatus("");
        setFieldError("");
        const form = document.getElementById('createForm') as HTMLFormElement 
        form.reset();
        
      }
    }
  };

  if (mode === "delete") {
    return (
      <>
        <ModalContainer show={showDeleteModal}>
          <ModalCloseRow>
            <IoClose
              onClick={() => {
                if(setShowDeleteModal)
                setShowDeleteModal(false);
              }}
            />
          </ModalCloseRow>
          <h2>Are you sure that yo want to delete this item?</h2>
          <ModalButtonRow>
            <Button type="delete" onClick={onClickDeleteHandler}>
              Delete
            </Button>
            <Button
              onClick={() => {
                if(setShowDeleteModal)
                  setShowDeleteModal(false);
              }}
            >
              Cancel
            </Button>
          </ModalButtonRow>
        </ModalContainer>
      </>
    );
  }
  if (mode === "create") {
    if (page === "users") {
      return (
        <>
          <ModalContainer show={showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowCreateModal)
                  setShowCreateModal(false);
                  setFieldError("");
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createForm">
              <h2>New User</h2>
              <p>{fieldError}</p>

              <Input>
                <label htmlFor="image">Image Link</label>
                <input
                  type="link"
                  name="image"
                  onChange={(e) => {
                    setUserImage(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="position">Position</label>
                <select
                  name="position"
                  defaultValue={"manager"}
                  onChange={(e) => {
                    setUserPosition(e.target.value);
                  }}
                >
                  <option>Manager</option>
                  <option>Recepcionist</option>
                  <option>Room Service</option>
                </select>
              </Input>
              <Input>
                <label htmlFor="name">Phone Number</label>
                <input
                  type="tel"
                  name="name"
                  onChange={(e) => {
                    setUserPhone(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="name"
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                />
              </Input>
              <RadioInput>
                <Label active htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="ACTIVE"
                    onChange={(e) => {
                      setUserState(e.target.value);
                    }}
                  />
                  ACTIVE
                </Label>
                <Label inactive htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="INACTIVE"
                    onChange={(e) => {
                      setUserState(e.target.value);
                    }}
                  />
                  INACTIVE
                </Label>
              </RadioInput>
              <Input>
                <label htmlFor="name">Date of Start</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={getTodayString()}
                  onChange={(e) => {
                    setUserStartDate(e.target.value);
                  }}
                />
              </Input>
              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }
    if (page === "bookings") {
      return (
        <>
          <ModalContainer show={showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowCreateModal)
                 setShowCreateModal(false);
                  setFieldError("");             
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createForm">
              <h2>New Booking</h2>
              <p>{fieldError}</p>

              <Input>
                <label htmlFor="guestName">Guest Name</label>
                <input
                  type="text"
                  name="guestName"
                  onChange={(e) => {
                    setGuestName(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="orderDate">Order Date</label>
                <input
                  type="date"
                  name="orderDate"
                  defaultValue={getTodayString()}
                  onChange={(e) => {
                    setOrderDate(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="checkIn">Check In</label>
                <input
                  type="date"
                  name="checkIn"
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="checkOut">Check Out</label>
                <input
                  type="date"
                  name="checkOut"
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="room">Room</label>
                <input
                  type="text"
                  name="room"
                  placeholder="Must exist! R-XXXX"
                  onChange={(e) => {
                    setBookingRoomId(e.target.value);
                  }}
                />
              </Input>
              <InputBig>
                <label htmlFor="specialRequest">Special Request</label>
                <input
                  type="text"
                  name="specialRequest"
                  defaultValue={specialRequest}
                  onChange={(e) => {
                    setSpecialRequest(e.target.value);
                  }}
                />
              </InputBig>

              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }

    if (page === "rooms") {
      return (
        <>
          <ModalContainer show={showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowCreateModal)
                  setShowCreateModal(false);
                  setFieldError("");
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createForm">
              <h2>New Room</h2>
              <p>{fieldError}</p>

              <Input>
                <label htmlFor="roomNumber">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  defaultValue={roomNumber}
                  onChange={(e) => {
                    setRoomNumber(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="roomType">Room Type</label>
                <select
                  name="RoomType"
                  defaultValue={roomType}
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                >
                  <option>Single Bed</option>
                  <option>Double Bed</option>
                  <option>Double Superior</option>
                  <option>Suite</option>
                </select>
              </Input>
              <Input>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  name="discount"
                  defaultValue={discount}
                  onChange={(e) => {
                    setDiscount(Number(e.target.value));
                  }}
                />
              </Input>
              <RadioInput>
                <Label active htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="AVAILABLE"
                    onChange={(e) => {
                      setRoomStatus(e.target.value);
                    }}
                  />
                  AVAILABLE
                </Label>
                <Label inactive htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="BOOKED"
                    onChange={(e) => {
                      setRoomStatus(e.target.value);
                    }}
                  />
                  BOOKED
                </Label>
              </RadioInput>
              <InputBig>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </InputBig>

              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }
    else return(<></>)
  }

  if (mode === "moreInfo") {
    if (page === "contacts" && target !== undefined) {
      return (
        <>
          <ModalContainer show={showModal}>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowModal)
                  setShowModal(false);
                }}
              />
            </ModalCloseRow>
           
              <ReviewComment>{target.comment}</ReviewComment>
              <ReviewInfo>
                <div>
                  <h4>{target.customer.name}</h4>
                  <p>{dateConverter(target.date).date}</p>
                </div>
                {target.archived !== true ? (
                  <ArchiveButton archived>Archived</ArchiveButton>
                ) : (
                  ""
                )}
                {target.archived ? (
                  <ArchiveButton unarchived>Unarchived</ArchiveButton>
                ) : (
                  ""
                )}
              </ReviewInfo>
            
          </ModalContainer>
        </>
      );
    }
    if(page === "bookings" && targetBooking !== undefined){
      return (
        <>
          <ModalContainer show={showNotesModal}>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  if(setShowNotesModal)
                  setShowNotesModal(false);
                }}
              />
            </ModalCloseRow>
           
              <ReviewComment>{targetBooking.specialRequest}</ReviewComment>
              <ReviewInfo>
                <div>
                  <h4>{targetBooking.name}</h4>
                  <p>{dateConverter(targetBooking.orderDate).date}</p>
                </div>
              </ReviewInfo>
            
          </ModalContainer>
        </>
      );
    }
    else return(<></>)
  }
  else return(<></>)
};