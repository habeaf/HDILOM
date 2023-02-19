import { useCallback, useRef, useState } from "react";
import { useSetupPage } from "../../contexts/setupPage";
import { Header } from "../../../../common/components/Header/Header";
import { Loader } from "../../../../common/Loader";
import Webcam from "react-webcam";
import cn from "classnames";
import "./ImageDialog.scss";

interface ImageDialogProps {
  id: number;
  thumbnail: string;
  setShowImageDialog: any;
}

const ImageDialog = ({ id, thumbnail, setShowImageDialog }: ImageDialogProps) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string>();
  const [showLoader, setShowLoader] = useState(false);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0.666666667,
    facingMode: "user",
    audio: false,
  };

  const { setSetupImages, setupImages } = useSetupPage();

  const webcamRef = useRef(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = (webcamRef as any).current.getScreenshot();
    setCapturedPhoto(imageSrc);
  }, [webcamRef]);

  const retryCapture = () => {
    setCapturedPhoto(undefined);
  };

  const uploadPhoto = async (e: any) => {
    setShowLoader(true);
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      const img = (e.target as any).result;
      setCapturedPhoto(img);
      setShowLoader(false);
      return;
    };

    await setInterval(() => {
      !capturedPhoto && setShowLoader(false);
    }, 1500);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveCapture = () => {
    setShowImageDialog(false);

    setSetupImages({
      ...setupImages,
      [id]: capturedPhoto,
    });
  };

  return (
    <>
      <div className="image-dialog-wrapper">
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="image-dialog">
          <div className="description-area">
            <div className="texts">
              <p className="title">Lorem, ipsum dolor sit amet consectetur</p>
              <p className="desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga provident nihil placeat deleniti tenetur
                eius modi ea consequatur quibusdam ratione dolorum
              </p>
            </div>

            <img className="example-image" src={thumbnail} alt="" />
          </div>

          <div className="image-area">
            <div className="webcam-preview-wrapper">
              {capturedPhoto ? (
                <img src={capturedPhoto}></img>
              ) : (
                <div className="webcam-preview">
                  {showLoader ? (
                    <Loader />
                  ) : (
                    <Webcam audio={false} videoConstraints={videoConstraints} ref={webcamRef} mirrored />
                  )}
                </div>
              )}
            </div>

            <div className="buttons">
              <div className="top">
                {!capturedPhoto ? (
                  <button className="button" onClick={capturePhoto}>
                    Capture the Image!
                  </button>
                ) : (
                  <button className="button button-retry" onClick={retryCapture}>
                    Retry!
                  </button>
                )}

                <label className="button" onClick={retryCapture}>
                  Upload Photo
                  <input
                    type="file"
                    className="button"
                    onClick={uploadPhoto}
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => uploadPhoto(e)}
                    onBlur={() => setShowLoader(false)}
                  />
                </label>
              </div>

              <button className={cn("button button-ready", !capturedPhoto && "disabled")} onClick={saveCapture}>
                Ready!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop" onClick={() => setShowImageDialog(false)} />
    </>
  );
};

export { ImageDialog };
