import {
  Card,
  CardContainer,
  CardImage,
  Booked,
  CardTitle,
  CardItem,
  CardSeparator,
  CardAmenitie,
  TitleRow,
  FeaturesRow,
  CardHeader,
  CloseIcon,
  CardImageText,
} from "../../Components/CardStyled";
import { MySlider } from "../../Components/Slider";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleRoom,
  getSingleRoomStatus,
  editRoom,
  getRoom,
} from "../../Features/roomSlice";
import { useEffect, useState } from "react";
import {
  offerChecker,
  offerPriceCalc,
  roomInfoChooser,
} from "../../Features/otherFunctions";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import {
  Input,
  InputBig,
  Label,
  RadioInput,
} from "../../Components/FormStyled";
import { Button } from "../../Components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";
import NotFound from "../notfoundpage/notfoundpage";
import { toastWarning, toastSuccess } from "../../Features/toastify";

export const SingleRoom = () => {
  const roomId = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const singleRoomData = useAppSelector(getSingleRoom);
  const singleRoomStatus = useAppSelector(getSingleRoomStatus);

  const [fieldError, setFieldError] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (singleRoomData && roomId) {
      if (roomId.id !== singleRoomData.id) {
        dispatch(getRoom(roomId.id as string));
      }
    }

    if (singleRoomData) {
      setRoomType(singleRoomData.roomType);
      setRoomNumber(singleRoomData.roomNumber);
      setPrice(singleRoomData.price);
      setDiscount(singleRoomData.discount);
      setStatus(singleRoomData.status);
      setDescription(singleRoomData.description);
    }
  }, [dispatch, singleRoomStatus, roomId.id, singleRoomData]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      roomType === "" ||
      roomNumber === "" ||
      price === undefined ||
      status === "" ||
      description === "" ||
      discount === undefined
    ) {
      toastWarning("It seems you miss enter some field!");
      setDiscount(0);
    } else {
      if (singleRoomData) {
        const room = {
          id: singleRoomData.id,
          roomType: roomType,
          roomNumber: roomNumber,
          price: price,
          discount: discount,
          status: status,
          amenities: roomInfoChooser(roomType).amenities,
          cancellation: roomInfoChooser(roomType).cancellation,
          thumbnail: roomInfoChooser(roomType).thumbnail,
          description: description,
          images: roomInfoChooser(roomType).images,
        };
        dispatch(editRoom(room)).then(() => {
          dispatch(getRoom(room.id));
          toastSuccess("Room modified!");
        });
        
        setEdit(false);
      }
    }
  };

  if(singleRoomStatus === "pending") {
    return (
      <>
        <Wrapper>
          <PropagateLoader color="#407957" size={15} />
        </Wrapper>
      </>
    )} else {
    if (singleRoomStatus === "fulfilled") {
      if (edit !== true) {
        return (
          <>
            <CardContainer full>
              <Card full>
                <CardHeader>
                  <FiArrowLeftCircle
                    onClick={() => {
                      navigate("/rooms");
                    }}
                  />
                  <FiEdit
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                </CardHeader>
                <TitleRow>
                  <CardTitle>
                    <h2>Room {singleRoomData.roomNumber}</h2>
                    <h5>{singleRoomData.roomType}</h5>
                  </CardTitle>
                </TitleRow>
                <FeaturesRow>
                  <CardItem paragraph>
                    <h3>Description</h3>
                    <p>{singleRoomData.description}</p>
                  </CardItem>
                </FeaturesRow>
                <CardSeparator />
                <FeaturesRow>
                  <CardItem price discount={singleRoomData.discount}>
                    <h6>Price</h6>
                    <h5>
                      {singleRoomData.price} <span>/per night</span>
                    </h5>
                  </CardItem>
                  <CardItem>
                    <h6>Discount</h6>
                    <h5>{singleRoomData.discount}%</h5>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem offer discount={singleRoomData.discount}>
                    <h6>Offer Price</h6>
                    <h5>
                      {offerPriceCalc(
                        singleRoomData.price,
                        singleRoomData.discount
                      )}{" "}
                      <span>/per night</span>
                    </h5>
                  </CardItem>
                  <CardItem state={singleRoomData.status}>
                    <h6>Status</h6>
                    <h5>{singleRoomData.status}</h5>
                  </CardItem>
                </FeaturesRow>
                <CardSeparator />

                <FeaturesRow amenities>
                  {singleRoomData.amenities.map((amenitie, i) => {
                    return (
                      <CardItem amenitie key={i}>
                        <CardAmenitie>{amenitie}</CardAmenitie>
                      </CardItem>
                    );
                  })}
                </FeaturesRow>
              </Card>
              <CardImage>
                <MySlider data={singleRoomData.images} />

                <Booked bookStatus={offerChecker(singleRoomData.discount)}>
                  {offerChecker(singleRoomData.discount)}
                </Booked>
                <CardImageText>
                  <h4>Cancellation</h4>
                  <p>{singleRoomData.cancellation}</p>
                </CardImageText>
              </CardImage>
            </CardContainer>
          </>
        );
      } else {
        return (
          <>
            <CardContainer>
              <Card>
                <CardHeader>
                  <FiArrowLeftCircle
                    onClick={() => {
                      navigate("/rooms");
                    }}
                  />
                  <p>{fieldError}</p>
                  <CloseIcon
                    onClick={() => {
                      setEdit(false);
                      setFieldError("");
                    }}
                  />
                </CardHeader>
                <form onSubmit={onSubmitHandler}>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Room Number</h6>
                        <input
                          type="number"
                          name="roomNumber"
                          defaultValue={roomNumber}
                          onInput={(e) => {
                            setRoomNumber(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>Room Type</h6>
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
                    </CardItem>
                  </FeaturesRow>

                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Price</h6>
                        <input
                          type="number"
                          name="price"
                          defaultValue={price}
                          onInput={(e) => {
                            setPrice(Number(e.currentTarget.value));
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>Discount</h6>
                        <input
                          type="number"
                          name="discount"
                          defaultValue={discount}
                          onInput={(e) => {
                            setDiscount(Number(e.currentTarget.value));
                          }}
                        />
                      </Input>
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <RadioInput>
                        <h6>State</h6>
                        <Label active htmlFor="state">
                          <input
                            type="radio"
                            name="state"
                            value="AVAILABLE"
                            defaultChecked={
                              status === "AVAILABLE" ? true : false
                            }
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          />
                          AVAILABLE
                        </Label>
                        <Label inactive htmlFor="state">
                          <input
                            type="radio"
                            name="state"
                            value="BOOKED"
                            defaultChecked={status === "BOOKED" ? true : false}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          />
                          BOOKED
                        </Label>
                      </RadioInput>
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <InputBig>
                      <h6>Description</h6>
                      <input
                        type="text"
                        name="description"
                        defaultValue={description}
                        onInput={(e) => {
                          setDescription(e.currentTarget.value);
                        }}
                      />
                    </InputBig>
                  </FeaturesRow>

                  <CardSeparator />

                  <FeaturesRow>
                    <Button>Save</Button>
                  </FeaturesRow>
                </form>
              </Card>
            </CardContainer>
          </>
        );
      }
    } else {
      return (
        <>
          <NotFound />
        </>
      );
    }
  }
};