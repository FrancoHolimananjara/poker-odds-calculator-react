import PropTypes from "prop-types";
DivWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function DivWrapper({ children }) {
  return <div className=" ">{children}</div>;
}
