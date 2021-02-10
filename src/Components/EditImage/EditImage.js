import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Camera from "../Camera";
import SideBarItem from "../SideBarItem/SideBarItem";
import Slider from "../Slider/Slider";
import "./EditImage.css";

const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
  {
    name: "Image Ratings",
    route: "/rating",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function EditImage() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const [image, setImage] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [captureImage, setCaptureImage] = useState(false);
  const editedImages = [];
  const [imgSrc, setImgSrc] = React.useState(null);

  const history = useHistory();

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" "), backgroundImage: `url(${image})` };
  }

  console.log(getImageStyle());

  var retrievedEditedImage = localStorage.getItem("editImage");
  console.log("retrievedEditedImage: ", JSON.parse(retrievedEditedImage));

  const onSaveEditedImage = () => {
    let editedImage = {
      imageUrl: `${image}`,
      filters: getImageStyle(),
    };
    editedImages.push(editedImage);
    console.log(editedImages);
    localStorage.setItem("editedImages", JSON.stringify(editedImages));
  };

  const setEditImage = () => {
    setImage(imgSrc);
  };

  return (
    <div className="container">
      <div className="main-image" style={getImageStyle()}>
        {captureImage && !image ? (
          <Camera
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setEditImage={setEditImage}
          />
        ) : null}

        {!image && !captureImage ? (
          <>
            <div className="input_container">
              <input
                className="input_url"
                type="text"
                placeholder="Enter Your Image Url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "8px" }}
                onClick={() =>
                  inputUrl
                    ? setImage(inputUrl)
                    : alert("Image Url Incorrect, Try again.")
                }
              >
                Add Image Url
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "8px" }}
                onClick={() => setCaptureImage(true)}
              >
                Capture Image
              </Button>
            </div>
          </>
        ) : null}
        <div className="removeImage">
          {image ? (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "8px" }}
                onClick={() => {
                  setImage("");
                  setImgSrc(null);
                  setCaptureImage(false);
                }}
              >
                Remove Image
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "8px" }}
                onClick={onSaveEditedImage}
              >
                Save Edited Image
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SideBarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => {
                if (option.name === "Image Ratings") {
                  history.push(`${option.route ? option.route : null}`);
                }
                if (option.name !== "Image Ratings") {
                  setSelectedOptionIndex(index);
                }
              }}
            />
          );
        })}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  );
}

export default EditImage;
