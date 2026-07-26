import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({ rating }) => {
  const rate = Math.round(rating);
  return (
    <>
      { [...Array(5)].map((_, i) => {
        return rate > i ? <TiStarFullOutline style={{ color: "red" }} key={i} /> : <CiStar key={i} />;
      })}
    </>
  );
};

export default Rating;
