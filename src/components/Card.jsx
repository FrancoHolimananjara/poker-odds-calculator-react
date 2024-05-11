import { Club, Diamond, Heart, Spade } from "lucide-react";
import PropTypes from "prop-types";
Card.propTypes = {
  rank: PropTypes.string,
  suit: PropTypes.string,
};
export default function Card({ rank, suit }) {
  return (
    <button className="dark:bg-white bg-slate-200 pt-2 pb-2 pl-2 pr-2 rounded-md cursor-pointer hover:bg-gray-200">
      <p
        className="flex items-center justify-between relative p-1 sm:p-2"
        style={{
          color:
            suit == "d" || suit == "h"
              ? "red"
              : suit == "c"
              ? "green"
              : "black",
        }}
      >
        <span className="absolute -top-1 -left-1">
          {suit == "d" ? (
            <Diamond color="red" size={14} />
          ) : suit == "h" ? (
            <Heart color="red" size={14} />
          ) : suit == "s" ? (
            <Spade size={14} />
          ) : (
            <Club color="green" size={14} />
          )}
        </span>
        <span className="font-bold text-md sm:text-md mt-1 mb-2">{rank}</span>
        <span className="absolute -bottom-1 -right-1">
          {suit == "d" ? (
            <Diamond color="red" size={14} />
          ) : suit == "h" ? (
            <Heart color="red" size={14} />
          ) : suit == "s" ? (
            <Spade size={14} />
          ) : (
            <Club color="green" size={14} />
          )}
        </span>
      </p>
    </button>
  );
}
