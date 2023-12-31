import {
  getContactsData,
  getContactsStatus,
  archiveContacts,
  fetchContacts,
} from "../../Features/contactSlice";
import { useEffect, useState } from "react";
import {
  LeftActions,
  RightActions,
  TableActions,
  TableContainer,
  TableItem,
  TableLink,
  TableRow,
  TableTitle,
} from "../../Components/TableStyled";
import { dateConverter } from "../../Features/otherFunctions";
import { ArchiveButton } from "../../Components/Button";
import { LastReviews } from "../../Components/LastReviews";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Contact } from "../../interfaces";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";
import { toastSuccess } from "../../Features/toastify";



export const Contacts = () => {
  const dispatch = useAppDispatch();
  
  const contactsStatus = useAppSelector(getContactsStatus);
  const contactsData = useAppSelector(getContactsData);
  const [tableData, setTableData] = useState(contactsData);
  const [recentContacts, setRecentContacts] = useState<Contact[]>();

  const [showAll, setShowAll] = useState("true");
  const [showArchived, setShowArchived] = useState("false");

  const tableTitles = ["Date", "Customer", "Comment", "Action"];

  useEffect(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
    if (showAll === "true") {
      setTableData(contactsData);
    }

    if (showArchived === "true") {
      setTableData(tableData.filter((contact) => contact.archived === true));
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
  }, [
    dispatch,
    contactsStatus,
    contactsData,
    showArchived,
    tableData,
    showAll,
  ]);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.target as HTMLElement;
    const option = input.innerText;
    if (option === "All Contacts") {
      setShowAll("true");
      setShowArchived("false");
      setTableData(contactsData);
    } else if (option === "Archived") {
      setShowAll("false");
      setShowArchived("true");
      setTableData(tableData.filter((contact) => contact.archived === true));
    }
  };

  const onClickArchiveHandler = (contact: Contact) => {
    dispatch(archiveContacts(contact)).then(()=> {
      dispatch(fetchContacts())
          
    });
    if (showArchived === "true") {
      setTableData(contactsData.filter((contact) => contact.archived === true))
      
    }
    if (contact.archived === true) {
      toastSuccess("Contact archived!")
    } else {
      toastSuccess("Contact unarchived!")
    }
  };

  if (contactsStatus === "pending") {
    return (
      <>
        <Wrapper>
          <PropagateLoader color="#407957" size={15} />
        </Wrapper>
      </>
    )
  } else {
    if (tableData.length > 0) {
      return (
        <>
          <LastReviews data={recentContacts} />
          <TableActions>
            <LeftActions>
              <TableLink active={showAll} onClick={onClickHandler}>
                All Contacts
              </TableLink>
              <TableLink active={showArchived} onClick={onClickHandler}>
                Archived
              </TableLink>
            </LeftActions>
            <RightActions></RightActions>
          </TableActions>
          <TableContainer>
            <thead>
              <TableTitle>
                {tableTitles.map((element) => (
                  <th key={tableTitles.indexOf(element)}>{element}</th>
                ))}
              </TableTitle>
            </thead>
            <tbody>
              {tableData.map((element) => (
                <TableRow key={element.id}>
                  <TableItem>
                    <p>{element.id}</p>
                    {dateConverter(element.date).date}
                    <p>{dateConverter(element.date).hour}</p>
                  </TableItem>
                  <TableItem big>
                    {element.subject}
                    <p>{element.comment}</p>
                  </TableItem>
                  <TableItem>
                    {element.customer.name}
                    <p>{element.customer.phone}</p>
                    <p>{element.customer.email}</p>
                  </TableItem>
                  <TableItem>
                    {element.archived !== true ? (
                      <ArchiveButton
                        archived
                        onClick={() => onClickArchiveHandler(element)}
                      >
                        Archive
                      </ArchiveButton>
                    ) : (
                      ""
                    )}
                    {element.archived ? (
                      <ArchiveButton
                        unarchived
                        onClick={() => onClickArchiveHandler(element)}
                      >
                        Unarchive
                      </ArchiveButton>
                    ) : (
                      ""
                    )}
                  </TableItem>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
        </>
      );
    } else {
      
      return (
        <NotFound />
      );
    }
  }
};
