import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07111c",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid #8aebff",
            borderRadius: "4px",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
