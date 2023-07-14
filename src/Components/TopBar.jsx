import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { Nav, NavItemContainer } from "./TopBarStyled";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginProvider";

export const TopBar = (props) => {
  const logout = useLogin()
  const onClickSideBarHandler = () => {
      if (props.open) {
        props.showSideBar(false);
      } else {
        props.showSideBar(true);
      }
  };
  const navigate = useNavigate()
  const HandleLogout = (event) => {
    event.preventDefault()
    logout.dispatch({type: 'logout'})
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/Login");
  };
  const HandleMail = () => {
    navigate("/Contact");
  };


  if (props.open) {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarLeft onClick={onClickSideBarHandler} />
            <h2>{props.page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail onClick={HandleMail}/>
            <HiOutlineLogout onClick={HandleLogout} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarRight onClick={onClickSideBarHandler} />
            <h2>{props.page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail onClick={HandleMail}/>
            <HiOutlineLogout onClick={HandleLogout} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>
    );
  }
};
