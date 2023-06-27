import styled from "styled-components";


export const EditButton = styled.button`
  font-family: "Poppins";
  font-size: 12px;
  font-weight: normal;
  min-width: 100px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: #EBF1EF;
  color: #135846;

    &:hover{
      scale: 1.2;
      cursor: pointer;
      background-color: #135846;
      color: #FFFFFF;
    }
`

export const Button = styled.button`
  font-family: "Poppins";
  font-size: 12px;
  font-weight: normal;
  padding: 0.5rem ;
  height: 32px;
  border-radius: 10px;
  border: none;
  min-width: 100px;
    
  background-color: ${props => {
    switch (props.type){
      case "delete":
      return "#E23428"
      default:
      return "rgb(19, 88, 70)";
    }
  }};
    color: #FFFFFF;

    &:hover{
      scale: 1.2;
      cursor: pointer;
      background: #EBF1EF;
      color: #135846;
  
    }
`



