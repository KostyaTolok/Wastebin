import React from "react";

function PasswordCheckbox(props) {
  
  return (
    <div>
      <input
        className="form__container-checkbox"
        name="password"
        id="password-checkbox"
        onChange={props.handlePasswordCheckboxChange}
        type="checkbox"
        checked={props.passwordCheckbox}
      />

      <label
        className="form__container-label"
        id="password-label"
        htmlFor="password-checkbox"
      >
        {props.passwordTitle}
      </label>
    </div>
  );
}

export default PasswordCheckbox;
