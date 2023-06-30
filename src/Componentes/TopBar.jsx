import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { Nav, NavItemContainer } from "./TopBarStyled";
import { useNavigate } from "react-router-dom";

export const TopBar = (props) => {
    const onClickSideBarHandler = () => {
        if (props.open) {
          props.showSideBar(false);
        } else {
          props.showSideBar(true);
        }
    };
    const navigate = useNavigate()
    const HandleLogout = () => {
      
      // Eliminar los datos de inicio de sesión del almacenamiento local
      localStorage.removeItem("logged");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
  
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/");
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
                <HiOutlineMail />
                <HiOutlineLogout onClick={HandleLogout}/>
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
                <HiOutlineMail />
                <HiOutlineLogout onClick={HandleLogout}/>
              </NavItemContainer>
            </Nav>
          </>
        );
      }
};
