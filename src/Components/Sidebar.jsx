import {    Wrapper, 
            Logo, 
            LinkContainer,
            User, 
            SideBarUserImage, 
            MenuLink, 
            Copyright, } from "./SideBarStyled";
import logo from "../Assets/Logo.png"
import {RiDashboardLine, RiKey2Line, RiCalendarEventFill, RiUser6Line} from 'react-icons/ri'; 
import { HiOutlineMail } from "react-icons/hi";

export const SideBar = () => {
    

    return(
        <Wrapper>
            <Logo>
                <img src={logo} alt="logo" />
                <div>
                    <h2>travl</h2>
                    <p>Hotel Admin Dashboard</p>
                </div>
            </Logo>
            <LinkContainer>
                <li><MenuLink to="/Dashboard"><RiDashboardLine/> Dashboard</MenuLink></li>
                <li><MenuLink to="/Rooms"><RiKey2Line/>Room</MenuLink></li>
                <li><MenuLink to="/Bookings"><RiCalendarEventFill/>Booking</MenuLink></li>
                <li><MenuLink to="/Contact"><HiOutlineMail/>Contact</MenuLink></li>
                <li><MenuLink to="/Users"><RiUser6Line/>Users</MenuLink></li>
            </LinkContainer>
            <User>
                <SideBarUserImage src="https://robohash.org/velitvoluptatibusrem.png?size=50x50&set=set1" alt="logo">
                    
                </SideBarUserImage>
                <h5>Roborock</h5>
                <p>Sys Admin</p>
                <button>Edit User</button>
            </User>
        
            <Copyright>
              <h6>Travl Hotel Admin Dashboard</h6>
              <p>2023 All Rights Reserved</p>
            </Copyright>
        </Wrapper>
    )
}