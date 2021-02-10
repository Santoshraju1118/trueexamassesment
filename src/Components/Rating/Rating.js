import React, { useEffect, useState } from "react";

function Rating() {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    var retrievedEditedImage = localStorage.getItem("editedImages");
    console.log("retrievedEditedImage: ", JSON.parse(retrievedEditedImage));
    setSavedImages(JSON.parse(retrievedEditedImage));
  }, []);

  return (
    <div style={{margin: "16px"}}>
      {savedImages?.map((images, index) => {
        return (
          <>
            <img key={index} src={`${images.imageUrl}`} alt="saved pic" style={images.filters} width="300px" />
          </>
        );
      })}
    </div>
  );
}

export default Rating;
