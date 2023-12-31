import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ReviewComment,
  ReviewContainer,
  ReviewInfo,
  ReviewSlider,
} from "./LastReviewsStyled";
import { dateConverter, maxCharString } from "../Features/otherFunctions";
import { ArchiveButton } from "./Button";
import { archiveContacts, fetchContacts } from "../Features/contactSlice";
import { Modal } from "./Modal";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Contact } from "../interfaces";
import { toastSuccess } from "../Features/toastify";

interface LastReviewsProps {
  data: Contact[] | undefined;
}

export const LastReviews = ({ data }: LastReviewsProps) => {
  const SlickButtonFix = ({
    currentSlide,
    slideCount,
    children,
    ...props
  }: any) => <span {...props}>{children}</span>;

  const [showModal, setShowModal] = useState(true);
  const [target, setTarget] = React.useState<Contact>();

  const dispatch = useAppDispatch();

  const settings = {
    prevArrow: <SlickButtonFix></SlickButtonFix>,
    nextArrow: <SlickButtonFix> </SlickButtonFix>,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
  };

  const onClickArchiveHandler = (contact: Contact) => {
    dispatch(archiveContacts(contact)).then(()=> {
      dispatch(fetchContacts())          
    });
    if (contact.archived === true) {
      toastSuccess("Contact archived!")
    } else {
      toastSuccess("Contact unarchived!")
    }
    
      
  };

  return (
    <>
      <ReviewSlider {...settings}>
        {data?.map((element: Contact, i: number) => (
          <div key={i}>
            <ReviewContainer
              onClick={() => {
                setTarget(element);
                setShowModal(true);
              }}
            >
              <ReviewComment>
                {maxCharString(element.comment, 130)}
              </ReviewComment>
              <ReviewInfo>
                <div>
                  <h4>{element.customer.name}</h4>
                  <p>{dateConverter(element.date).date}</p>
                </div>
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
              </ReviewInfo>
            </ReviewContainer>
          </div>
        ))}
      </ReviewSlider>
      <Modal
        mode="moreInfo"
        page={"contacts"}
        setShowModal={setShowModal}
        showModal={showModal}
        target={target}
      />
    </>
  );
};
