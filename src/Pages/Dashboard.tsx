import { MdOutlineKingBed } from "react-icons/md";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { KPI, KpiIcon, KpiRow, KpiText } from "./DashboardStyled";
import { useEffect, useState } from "react";
import { getContactsData, getContactsStatus } from "../Features/contactSlice";
import { fetchContacts } from "../Features/contactSlice";
import { LastReviews } from "../Components/LastReviews";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Contact } from "../interfaces";
import NotFound from "./notfoundpage/notfoundpage";
import { Wrapper } from "../Components/LayoutStyled";
import { PropagateLoader } from "react-spinners";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [recentContacts, setRecentContacts] = useState<Contact[]>();
  const contactsStatus = useAppSelector(getContactsStatus);
  const contactsData = useAppSelector(getContactsData);

  useEffect(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
    if (contactsData.length > 0) {
      setRecentContacts(
        [...contactsData]
          .sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          })
          .slice(0, 6)
      );
    }
  }, [contactsData, contactsStatus, dispatch]);

  if(contactsStatus === "pending"){
    return (
      <>
        <Wrapper>
          <PropagateLoader color="#407957"size={15}/>
        </Wrapper>
      </>
    );
    
  }else if(contactsStatus === "fulfilled"){
    return (
      <>
        <KpiRow data-testid="dashboard__kpi">
          <KPI>
            <KpiIcon>
              <MdOutlineKingBed />
            </KpiIcon>
            <KpiText>
              <h2>8,454</h2>
              <h6>New Booking</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineCalendarDays />
            </KpiIcon>
            <KpiText>
              <h2>963</h2>
              <h6>Scheduled Room</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowRightOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>753</h2>
              <h6>Check In</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowLeftOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>516</h2>
              <h6>Check Out</h6>
            </KpiText>
          </KPI>
        </KpiRow>
        <LastReviews data={recentContacts} />
      </>
    );
  }else {
    return(
      <>
      <NotFound/>
      </>
    )
  }

};