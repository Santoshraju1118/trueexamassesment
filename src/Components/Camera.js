import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Webcam from "react-webcam";
import "./Camera.css";
import CameraIcon from "@material-ui/icons/Camera";
import Loader from "./Loader/Loader";

function Camera({ imgSrc, setImgSrc, setEditImage }) {
  const webcamRef = React.useRef(null);
  const [loader, setLoader] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const downloadImage = (src) => {
    if (src) {
      setLoader(true);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        // create Canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // create <a> tag
        const a = document.createElement("a");
        a.download = `trueexamDownload.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
        setLoader(false);
      };
    }
  };

  return (
    <div className="camera">
      <Loader open={loader} />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: "100%", height: "400px" }}
      />
      <div className="camera__buttom">
        <IconButton onClick={capture}>
          <CameraIcon />
        </IconButton>
      </div>
      {imgSrc && (
        <>
          <img style={{ width: "300px" }} src={imgSrc} alt="user" />
          <div className="camera__download">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={setEditImage}
              >
                Edit Image
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => downloadImage(imgSrc)}
                style={{ marginLeft: "8px" }}
              >
                Download Image
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Camera;
