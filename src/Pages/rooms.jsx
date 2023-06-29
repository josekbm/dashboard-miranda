import React from "react";
import { TableContainer, LeftActions, StyledLink, RightActions, TableActions, TableTitle, TableItem, TableRow, ImageItem, RoomImageItem } from "../Componentes/TableStyled";
import { CustomDropdown } from "../Componentes/TableStyled";
import { Button, StatusButton  } from "../Componentes/Button";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { VscTrash } from "react-icons/vsc"
import { AiOutlineInfoCircle} from "react-icons/ai";

export function Rooms() {
    return (
      <>
        <TableActions>
          <LeftActions></LeftActions>
          <RightActions>
            <Button>
              + New
            </Button>
            <CustomDropdown />
          </RightActions>
        </TableActions>
        <TableContainer>
          <thead>
            <TableTitle>
              
            </TableTitle>
          </thead>
          <tbody>
            <TableRow>
                <TableItem>
                  <ImageItem>
                    <RoomImageItem />
                    <div>
                      <p></p>
                    </div>
                  </ImageItem>
                </TableItem>
                <TableItem>
                  <p></p>
                </TableItem>
                <TableItem>
                  <p></p>
                </TableItem>
                <TableItem>
                  
                  <p></p>
                </TableItem>
                <TableItem>
                  <StatusButton>
                    
                  </StatusButton>
                </TableItem>
                <TableItem>
                  <StyledLink>
                    <AiOutlineInfoCircle />
                  </StyledLink>
                </TableItem>
                <TableItem>
                  <VscTrash/>
                </TableItem>
              </TableRow>
          </tbody>
        </TableContainer>   
      </>
    );
  } 