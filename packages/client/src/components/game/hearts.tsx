import React, { FC } from "react";

interface HeartsProps {
  heartsDisplayCount: number;
}

const Hearts: FC<HeartsProps> = ({ heartsDisplayCount }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg
          style={{ width: "35px", color: "red", marginRight: "5px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <div id="hearts">{heartsDisplayCount}</div>
      </div>
    </>
  );
};

export default Hearts;
