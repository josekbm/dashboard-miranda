import {    Wrapper, 
            Logo, 
            LinkContainer,
            User, 
            SideBarUserImage, 
            MenuLink, 
            Copyright, } from "./SideBarStyled";
import logo from "../Assets/Logo.png"
import {RiDashboardLine, RiKey2Line, RiCalendarEventFill, RiUser6Line} from 'react-icons/ri'; 

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
                <li><MenuLink><RiDashboardLine/> Dashboard</MenuLink></li>
                <li><MenuLink><RiKey2Line/>Room</MenuLink></li>
                <li><MenuLink><RiCalendarEventFill/>Booking</MenuLink></li>
                <li><MenuLink><RiUser6Line/>Guest</MenuLink></li>
            </LinkContainer>
            <User>
                <SideBarUserImage>
           
                </SideBarUserImage>
                <h5></h5>
                <p></p>
                <button>Edit User</button>
            </User>
        
            <Copyright>
              <h6>Travl Hotel Admin Dashboard</h6>
              <p>2023 All Rights Reserved</p>
            </Copyright>
        </Wrapper>
    )
}