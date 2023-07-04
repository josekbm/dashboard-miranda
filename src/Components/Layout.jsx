import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";
import { SideBar } from "./Sidebar";
import { Container, Content, LeftMenu, RightSection } from "./LayoutStyled";

export const Layout = (props) => {
  let location = useLocation();
  

  let title = "";
  const [open, setOpen] = useState(true);

  const titleChooser = () => {
    if (location.pathname === "/Dashboard") {
      title = "Dashboard";
    } else if (location.pathname === "/Contact") {
      title = "Contact";
    } else if (location.pathname === "/Rooms") {
      title = "Rooms";
    } else if (location.pathname === "/Bookings") {
      title = "Bookings";
    } else if (location.pathname === "/Users") {
      title = "Users";
    } 

    return title;
  };

  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar />
        </LeftMenu>
        <RightSection open={open}>
          <TopBar
            page={titleChooser()}
            setAuth={props.setAuth}
            showSideBar={setOpen}
            open={open}
          />
          <Content>
            <Outlet />
          </Content>
        </RightSection>
      </Container>
    </>
  );
};