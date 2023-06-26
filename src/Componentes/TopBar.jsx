import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { Nav, NavItemContainer } from "./TopBarStyled";

export const Topbar = (props) => {
    const onClickSideBarHandler = () => {
        if (props.open) {
          props.showSideBar(false);
        } else {
          props.showSideBar(true);
        }
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
                <HiOutlineLogout onClick={onLogOutClickHandler} data-testid="logout__button"/>
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
                <HiOutlineLogout onClick={onLogOutClickHandler} data-testid="logout__button"/>
              </NavItemContainer>
            </Nav>
          </>
        );
      }
};
