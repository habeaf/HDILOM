import { useState } from "react";
import { useSetupPage } from "../../contexts/setupPage";
import { ImageDialog } from "../ImageDialog/ImageDialog";
import "./Box.scss";

interface BoxProps {
  id: number;
  label: string;
  placeholderImg: string;
}

const Box = ({ id, label, placeholderImg }: BoxProps) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const { setupImages } = useSetupPage();

  const uploadedPicture = (setupImages as any)[id];

  const openImageDialog = () => {
    setShowImageDialog(true);
  };

  return (
    <>
      <div className="box" onClick={openImageDialog}>
        <div className="box-context">
          <img src={uploadedPicture === undefined ? placeholderImg : uploadedPicture} />
        </div>
        <div className="box-label">
          <p>{label}</p>
        </div>
      </div>

      {showImageDialog && <ImageDialog id={id} thumbnail={placeholderImg} setShowImageDialog={setShowImageDialog} />}
    </>
  );
};

export { Box };
