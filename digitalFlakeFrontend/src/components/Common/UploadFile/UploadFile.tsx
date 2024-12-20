import { ChangeEvent } from "react";

const UploadFile = ({
  handleImageChange,
  preview,
}: {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
}) => {
  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div
        style={{
          height: "100px",
          width: "120px",
          borderRadius: "10px",
          border: "1px solid #9F9F9F",
          position: "relative",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <label
          style={{
            position: "absolute",
            fontSize: "12px",
            backgroundColor: "white",
            top: "-10px",
            left: "15px",
          }}
        >
          Upload Image
        </label>
        {preview && (
          <img src={preview} style={{ height: "70px", width: "90px" }} />
        )}
      </div>
      <div
        style={{
          height: "100px",
          width: "120px",
          borderRadius: "10px",
          border: "1px dashed #000",
          padding: "10px",
          position: "relative",
        }}
      >
        <div>
          <i className="bi-cloud-upload w-5 h-3 " />
        </div>
        <div style={{ fontSize: "10px" }}>
          Upload Maximum allowed file size is 10MB
        </div>
        <input
          style={{
            zIndex: "99",
            height: "123px",
            width: "152px",
            position: "absolute",
            opacity: "0",
            top: 0,
            left: 0,
            borderRadius: "10px",
          }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default UploadFile;
