import {
  getUsersStatus,
  getUsersData,
  fetchUsers,
} from "../../Features/userSlice";
import { useEffect, useState } from "react";
import { Button, StatusButton } from "../../Components/Button";
import {
  CustomDropdown,
  ImageItem,
  LeftActions,
  RightActions,
  SearchBar,
  StyledLink,
  TableActions,
  TableItem,
  TableLink,
  UserTableImage,
  TableRow,
  TableContainer,
  TableTitle,
} from "../../Components/TableStyled";
import { Modal } from "../../Components/Modal";
import { dateConverter } from "../../Features/otherFunctions";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NotFound from "../notfoundpage/notfoundpage";
import { Wrapper } from "../../Components/LayoutStyled";
import PropagateLoader from "react-spinners/PropagateLoader";

export const Users = () => {
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const usersData = useAppSelector(getUsersData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAll, setShowAll] = useState("true");
  const [showActive, setShowActive] = useState("false");
  const [showInactive, setShowInactive] = useState("false");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(usersData);
  const [orderValue, setOrderValue] = useState("ID");

  const tableTitles = [
    "Name",
    "Start Date",
    "Description",
    "Contact",
    "Status",
    "Details",
    "Delete",
  ];

  const options = ["Date", "Name", "ID"];

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    setTableData(usersData);
  }, [dispatch, usersStatus, usersData]);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.target as HTMLElement;
    const option = input.innerText;
    if (option === "All users") {
      setShowAll("true");
      setShowActive("false");
      setShowInactive("false");
      setOrderValue("ID");
      setTableData(usersData);
    } else if (option === "Active users") {
      setShowActive("true");
      setShowAll("false");
      setShowInactive("false");
      setOrderValue("ID");
      setTableData(usersData.filter((user) => user.state === "ACTIVE"));
    } else if (option === "Inactive users") {
      setShowActive("false");
      setShowAll("false");
      setShowInactive("true");
      setOrderValue("ID");
      setTableData(usersData.filter((user) => user.state === "INACTIVE"));
    }
  };

  const onSearchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableData(
      tableData.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value === "") {
      if (showAll === "true") {
        setTableData(usersData);
      }
      if (showActive === "true") {
        setTableData(usersData.filter((user) => user.state === "ACTIVE"));
      }
      if (showInactive === "true") {
        setTableData(usersData.filter((user) => user.state === "INACTIVE"));
      }
    }
  };

  const onChangeHandler = (e: any) => {
    const option = e.value;
    console.log(option);
    if (option === "ID") {
      setTableData(usersData);
    }
    if (option === "Name") {
      setOrderValue("Name");
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      );
    }
    if (option === "Date") {
      setOrderValue("Date");
      setTableData(
        [...tableData].sort((a, b) => {
          if (a.startDate < b.startDate) return -1;
          if (a.startDate > b.startDate) return 1;
          return 0;
        })
      );
    }
  };

  if (usersStatus === "pending") {
    return (
      <>
        <Wrapper>
          <PropagateLoader color="#407957" size={15} />
        </Wrapper>
      </>
    );
  } else {
    if (usersStatus === "fulfilled" && tableData.length > 0) {
      return (
        <>
          <TableActions>
            <LeftActions>
              <TableLink active={showAll} onClick={onClickHandler}>
                All users
              </TableLink>
              <TableLink active={showActive} onClick={onClickHandler}>
                Active users
              </TableLink>
              <TableLink active={showInactive} onClick={onClickHandler}>
                Inactive users
              </TableLink>
            </LeftActions>
            <RightActions>
              <SearchBar>
                <AiOutlineSearch />
                <input
                  type="text"
                  name="users"
                  id="users"
                  onChange={onSearchInputHandler}
                  placeholder="Search By Name"
                />
              </SearchBar>
              {showAll === "true" ? (
                <Button
                  onClick={() => {
                    setShowCreateModal(true);
                  }}
                >
                  + New{" "}
                </Button>
              ) : (
                ""
              )}
              <CustomDropdown
                arrowOpen={<MdOutlineKeyboardArrowUp />}
                arrowClosed={<MdOutlineKeyboardArrowDown />}
                options={options}
                onChange={onChangeHandler}
                value={orderValue}
              />
            </RightActions>
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
                    <ImageItem user>
                      <UserTableImage src={element.photo} alt="user" />

                      <div>
                        {element.name}
                        <p>{element.id}</p>
                      </div>
                    </ImageItem>
                  </TableItem>
                  <TableItem>
                    {dateConverter(element.startDate).date}
                    <p>{dateConverter(element.startDate).hour}</p>
                  </TableItem>
                  <TableItem>
                    <p>{element.jobDescription}</p>
                  </TableItem>
                  <TableItem>
                    <p>{element.phone}</p>
                    <p>{element.email}</p>
                  </TableItem>
                  <TableItem>
                    <StatusButton status={element.state}>
                      {" "}
                      {element.state}
                    </StatusButton>
                  </TableItem>
                  <TableItem>
                    <StyledLink to={`/users/${element.id}`}>
                      <AiOutlineInfoCircle />
                    </StyledLink>
                  </TableItem>
                  <TableItem>
                    <VscTrash
                      onClick={() => {
                        setShowDeleteModal(true);
                        setTargetId(element.id);
                      }}
                    />
                  </TableItem>
                </TableRow>
              ))}
            </tbody>
          </TableContainer>
          <Modal
            mode="delete"
            page={"users"}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={targetId}
          />

          <Modal
            mode="create"
            page={"users"}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
        </>
      );
    } else {
      return <NotFound />;
    }
  }
};
