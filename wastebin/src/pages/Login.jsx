import React, { useState } from "react";
import { binAuth } from "../auth/bin-auth";
import { useNavigate } from "react-router";
import ErrorsList from "../components/ErrorsList";

function Login(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function submitLoginForm() {
    let tempErrors = [];

    if (loginData.email === "") {
      tempErrors.push("Email cannot be blank");
    }

    if (loginData.password === "") {
      tempErrors.push("Password cannot be blank");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      binAuth
        .login(loginData.email, loginData.password)
        .then((creds) => {
          binAuth.getUserPhotoUrl(creds.user.photoURL).then((photoUrl) => {
            props.updateUserInfo({
              username: creds.user.displayName,
              image: photoUrl,
            });
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setErrors(["Email or password is incorrect"]);
        });
    }
  }

  function handleChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <ErrorsList errors={errors} />
      <div className="error-summary">
        <ul className="error-summary__list"></ul>
      </div>
      <h3 className="title form__title form__title_login">Login:</h3>
      <div className="form__container">
        <label className="form__container-label" htmlFor="email-input">
          Email:
        </label>
        <input
          className="input form__container-input"
          name="email"
          id="email-input"
          type="email"
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleChange}
        />
        <input
          onClick={submitLoginForm}
          className="button button-medium form__container-input form__container-button button-submit"
          type="button"
          value="Login"
        />
      </div>
    </form>
  );
}

export default Login;
