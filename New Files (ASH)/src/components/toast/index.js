import React from "react";
import { toast } from "react-toastify";
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle
} from "react-icons/fa";
import PropTypes from "prop-types";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      // eslint-disable-next-line react/jsx-filename-extension
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;