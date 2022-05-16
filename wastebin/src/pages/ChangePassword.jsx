import React, { useState } from "react";
import { useNavigate } from "react-router";
import ErrorsList from "../components/ErrorsList";
import { binAuth } from "../auth/bin-auth";

function ChangePassword() {
  const [errors, setErrors] = useState([]);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  }

  function submitChangePasswordForm() {
    let tempErrors = [];

    if (passwordData.newPassword === "") {
      tempErrors.push("New password cannot be blank");
    }

    if (passwordData.confirmPassword !== passwordData.newPassword) {
      tempErrors.push("Passwords do not match");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      binAuth
        .updatePassword(passwordData.newPassword)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }
  }

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <ErrorsList errors={errors} />
      <h3 className="title form__title">Change password:</h3>
      <div className="form__container">
        <label className="form__container-label" htmlFor="new-password-input">
          New password:
        </label>
        <input
          className="input form__container-input"
          name="newPassword"
          id="new-password-input"
          type="password"
          value={passwordData.newPassword}
          onChange={handleChange}
        />
        <label
          className="form__container-label"
          htmlFor="confirm-password-input"
        >
          Confirm password:
        </label>
        <input
          className="input form__container-input"
          name="confirmPassword"
          id="confirm-password-input"
          type="password"
          value={passwordData.confirmPassword}
          onChange={handleChange}
        />
        <input
          className="button button-medium form__container-input form__container-button button-submit"
          type="button"
          onClick={submitChangePasswordForm}
          value="Change password"
        />
      </div>
    </form>
  );
}

export default ChangePassword;
