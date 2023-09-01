import {
  Wrapper,
  Logo,
  LinkContainer,
  User,
  SideBarUserImage,
  MenuLink,
  Copyright,
} from "./SideBarStyled";
import logo from "../Assets/Logo.png";
import {
  RiDashboardLine,
  RiKey2Line,
  RiCalendarEventFill,
  RiUser6Line,
} from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import { getUsersSingle } from "../Features/userSlice";

export const SideBar = () => {
  const navigate = useNavigate();
    
    const clickHandler = () => {
        navigate(`/users/U-0001}`);
    };

  return (
    <Wrapper>
      <Logo>
        <img src={logo} alt="logo" />
        <div>
          <h2>travl</h2>
          <p>Hotel Admin Dashboard</p>
        </div>
      </Logo>
      <LinkContainer>
        <li>
          <MenuLink to="/">
            <RiDashboardLine /> Dashboard
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/rooms">
            <RiKey2Line />
            Room
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/bookings">
            <RiCalendarEventFill />
            Booking
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/contacts">
            <HiOutlineMail />
            Contact
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/users">
            <RiUser6Line />
            Users
          </MenuLink>
        </li>
      </LinkContainer>
      <User>
        <SideBarUserImage
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="logo"
        ></SideBarUserImage>
        <h5>Admin</h5>
        <p>admin@admin.com</p>
        <button onClick={clickHandler}>Edit User</button>
      </User>

      <Copyright>
        <h6>Travl Hotel Admin Dashboard</h6>
        <p>2023 All Rights Reserved</p>
      </Copyright>
    </Wrapper>
  );
};
