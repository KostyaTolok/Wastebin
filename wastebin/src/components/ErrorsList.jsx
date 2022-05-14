import React from "react";

function ErrorsList(props) {
  return (
    <div
      className={`error-summary ${
        props.errors.length > 0 ? "error-summary_enabled" : ""
      }`}
    >
      <ul className="error-summary__list">
        {props.errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </ul>
    </div>
  );
}

export default ErrorsList;
