import React, { useState } from "react";
import { binAuth } from "../auth/bin-auth";
import { useNavigate } from "react-router";
import ErrorsList from "../components/ErrorsList";

function Register(props) {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function submitRegisterForm() {
    let tempErrors = [];

    if (registerData.email === "") {
      tempErrors.push("Email cannot be blank");
    }

    if (registerData.username === "") {
      tempErrors.push("Username cannot be blank");
    }

    if (registerData.password === "") {
      tempErrors.push("Password cannot be blank");
    }

    if (registerData.confirmPassword !== registerData.password) {
      tempErrors.push("Passwords do not match");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      binAuth
        .register(
          registerData.email,
          registerData.username,
          registerData.password
        )
        .then(() => {
          props.updateUserInfo({
            username: registerData.username,
          });

          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setErrors(["Email or username is already taken"]);
        });
    }
  }

  function handleChange(event) {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <ErrorsList errors={errors} />
      <h3 className="title form__title">Register:</h3>
      <div className="form__container">
        <label className="form__container-label" htmlFor="email-input">
          Email:
        </label>
        <input
          className="input form__container-input"
          name="email"
          id="email-input"
          type="email"
          value={registerData.email}
          onChange={handleChange}
        />
        <label className="form__container-label" htmlFor="username-input">
          Username:
        </label>
        <input
          className="input form__container-input"
          name="username"
          id="username-input"
          type="text"
          value={registerData.username}
          onChange={handleChange}
        />
        <label className="form__container-label" htmlFor="password-input">
          Password:
        </label>
        <input
          className="input form__container-input"
          name="password"
          id="password-input"
          type="password"
          value={registerData.password}
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
          value={registerData.confirmPassword}
          onChange={handleChange}
        />
        <input
          className="button button-medium form__container-input form__container-button button-submit"
          type="button"
          onClick={submitRegisterForm}
          value="Register"
        />
      </div>
    </form>
  );
}

export default Register;
