import PropTypes from "prop-types";
import Card from "./Card";

Hand.propTypes = {
  hand: PropTypes.array,
};

export default function Hand({ hand }) {
  return (
    <div className="flex gap-1 mt-2">
      {hand.map((h, key) => {
        return <Card key={key} rank={h[0][0]} suit={h[1][0]} />;
      })}
    </div>
  );
}
