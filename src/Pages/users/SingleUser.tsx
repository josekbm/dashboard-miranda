import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContainer,
  CardTitle,
  UserImage,
  CardItem,
  CardSeparator,
  TitleRow,
  FeaturesRow,
  CardHeader,
  CloseIcon,
} from "../../Components/CardStyled";
import { useEffect, useState } from "react";
import {
  editUser,
  getUser,
  getSingleUserStatus,
  getUsersSingle,
  
} from "../../Features/userSlice";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import { Button } from "../../Components/Button";
import { Input, Label, RadioInput } from "../../Components/FormStyled";
import { jobDescriptionChooser } from "../../Features/otherFunctions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";
import { toastSuccess, toastWarning } from "../../Features/toastify";

export const SingleUser = () => {
  const userId = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getUserData = useAppSelector(getUsersSingle);
  const getUserStatus = useAppSelector(getSingleUserStatus);

  const [fieldError, setFieldError] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("Manager");
  const [userEmail, setUserEmail] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userState, setUserState] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSalt, setUserSalt] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (getUserData && userId) {
      if (userId.id !== getUserData.id) {
        dispatch(getUser(userId.id as string));
      }
    }

    if (getUserData) {
      setUserImage(getUserData.photo);
      setUserEmail(getUserData.email);
      setUserName(getUserData.name);
      setUserPosition(getUserData.position);
      setUserState(getUserData.state);
      setUserPhone(getUserData.phone);
      setUserStartDate(getUserData.startDate);
      setUserPassword(getUserData.password);
      setUserSalt(getUserData.salt);
    }
  }, [dispatch, getUserStatus, userId.id, getUserData]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      if (getUserData) {
        const user = {
          id: getUserData.id,
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
        dispatch(editUser(user)).then(() => {
          dispatch(getUser(user.id));
          toastSuccess("User modified!");
        });
        dispatch(getUser(user.id));
        console.log(getUserData);
        setEdit(false);
      }
    }
  };

  if (getUserStatus === "rejected") {
    return (
      <>
      <NotFound />
      </>
    );
  } else {
    if (getUserData.id === userId.id) {
      if (edit !== true) {
        return (
          <>
            <CardContainer>
              <Card>
                <CardHeader>
                  <FiArrowLeftCircle
                    onClick={() => {
                      navigate("/users");
                    }}
                  />
                  <FiEdit
                    onClick={() => {
                      setEdit(true);
                    }}
                  />
                </CardHeader>

                <TitleRow>
                  <UserImage>
                    <img src={getUserData.photo} alt="" />
                  </UserImage>
                  <CardTitle>
                    <h2>{getUserData.name}</h2>
                    <h5>{getUserData.position}</h5>
                  </CardTitle>
                </TitleRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>Phone number</h6>
                    <h5>{getUserData.phone}</h5>
                  </CardItem>
                  <CardItem>
                    <h6>Email</h6>
                    <h5>{getUserData.email}</h5>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>Date of registration</h6>
                    <h5>{getUserData.startDate}</h5>
                  </CardItem>
                  <CardItem state={getUserData.state}>
                    <h6>Status</h6>
                    <h5>{getUserData.state}</h5>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <h6>Password</h6>
                    <h5>{"*********"}</h5>
                  </CardItem>
                </FeaturesRow>
                <CardSeparator />
                <FeaturesRow>
                  <CardItem paragraph>
                    <h3>Description</h3>
                    <p>{getUserData.jobDescription}</p>
                  </CardItem>
                </FeaturesRow>
              </Card>
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
                      navigate("/users");
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
                    <Input>
                      <h6>Image Link</h6>
                      <input
                        type="link"
                        name="image"
                        value={userImage}
                        onInput={(e) => {
                          setUserImage(e.currentTarget.value);
                        }}
                      />
                    </Input>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Name</h6>
                        <input
                          type="text"
                          name="name"
                          defaultValue={userName}
                          onInput={(e) => {
                            setUserName(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>Position</h6>
                        <select
                          name="position"
                          defaultValue={userPosition}
                          onChange={(e) => {
                            setUserPosition(e.target.value);
                          }}
                        >
                          <option>Manager</option>
                          <option>Recepcionist</option>
                          <option>Room Service</option>
                        </select>
                      </Input>
                    </CardItem>
                  </FeaturesRow>

                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Phone number</h6>
                        <input
                          type="tel"
                          name="name"
                          defaultValue={userPhone}
                          onInput={(e) => {
                            setUserPhone(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <Input>
                        <h6>Email</h6>
                        <input
                          type="email"
                          name="name"
                          defaultValue={userEmail}
                          onInput={(e) => {
                            setUserEmail(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Date of registration</h6>
                        <input
                          type="date"
                          name="startDate"
                          defaultValue={userStartDate}
                          onInput={(e) => {
                            setUserStartDate(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
                    <CardItem>
                      <RadioInput>
                        <h6>Status</h6>
                        <Label active htmlFor="state">
                          <input
                            type="radio"
                            name="state"
                            value="ACTIVE"
                            defaultChecked={
                              userState === "ACTIVE" ? true : false
                            }
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
                            defaultChecked={
                              userState === "INACTIVE" ? true : false
                            }
                            onChange={(e) => {
                              setUserState(e.target.value);
                            }}
                          />
                          INACTIVE
                        </Label>
                      </RadioInput>
                    </CardItem>
                  </FeaturesRow>
                  <FeaturesRow>
                    <CardItem>
                      <Input>
                        <h6>Password</h6>
                        <input
                          type="password"
                          defaultValue={userPassword}
                          name="password"
                          onInput={(e) => {
                            setUserPassword(e.currentTarget.value);
                          }}
                        />
                      </Input>
                    </CardItem>
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
          <Wrapper>
            <PropagateLoader color="#407957" size={15} />
          </Wrapper>
        </>
      );
    }
  }
};
