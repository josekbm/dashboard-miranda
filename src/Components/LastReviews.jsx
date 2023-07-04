import {
    ReviewComment,
    ReviewContainer,
    ReviewInfo,
    ReviewSlider,
} from "./LastReviewsStyled";
import { ArchiveButton } from "./Button";


export const LastReviews = (props) => {
       
    return (
      <>
        <ReviewSlider>
            <div>
              <ReviewContainer>
                <ReviewComment>
                  
                </ReviewComment>
                <ReviewInfo>
                  <div>
                    <h4></h4>
                    <p></p>
                  </div>
                  
                    <ArchiveButton>Archive</ArchiveButton>
                </ReviewInfo>
              </ReviewContainer>
            </div>
        </ReviewSlider>
        
      </>
    );
};