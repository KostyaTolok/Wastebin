import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { binAuth } from "../auth/bin-auth";
import ErrorsList from "../components/ErrorsList";
import icon from "../images/user-icon.jpg";
import "./user-profile.css";

function UserProfile(props) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [errors, setErrors] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let tempUserInfo = {};
    binAuth.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        tempUserInfo = {
          username: binAuth.user.displayName,
          email: binAuth.user.email,
        };
        if (binAuth.user.photoURL) {
          binAuth.getUserPhotoUrl(binAuth.user.photoURL).then((url) => {
            tempUserInfo.image = url;
            setUserInfo(tempUserInfo);
          });
        } else {
          tempUserInfo.image = "";
          setUserInfo(tempUserInfo);
        }
      }
    });
  }, []);

  function handleChange(event) {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  }

  function handleAddImage(event) {
    let fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
    let currentFiles = event.target.files;
    let tempErrors = [];
    if (currentFiles.length === 0) {
      tempErrors.push("No user image selected");
    } else if (currentFiles.length > 1) {
      tempErrors.push("Too many user images selected");
    } else if (!fileTypes.includes(currentFiles[0].type)) {
      tempErrors.push("Incorrect user image type");
    }
    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      let tempImage = window.URL.createObjectURL(currentFiles[0]);
      setCurrentImage(currentFiles[0]);
      setUserInfo({ ...userInfo, image: tempImage });
    }
  }

  function handleSubmit() {
    let tempErrors = [];
    if (userInfo.username === "") {
      tempErrors.push("Email cannot be blank");
    }

    if (userInfo.email === "") {
      tempErrors.push("Username cannot be blank");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      binAuth
        .updateUser(userInfo.email, userInfo.username, currentImage)
        .then(() => {
          props.updateUserInfo({
            username: userInfo.username,
            image: userInfo.image,
          });
          navigate("/");
        })
        .catch((error) => {
          tempErrors.push(error.message);
          setErrors(tempErrors);
        });
    }
  }

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <ErrorsList errors={errors} />
      <h3 className="title form__title form__title_update-user">My profile:</h3>
      <div className="form__container form__container_update-user">
        <label className="form__container-label" htmlFor="username-input">
          Username:
        </label>
        <input
          className="input form__container-input"
          name="username"
          id="username-input"
          type="text"
          value={userInfo.username}
          onChange={handleChange}
        />
        <label className="form__container-label" htmlFor="email-input">
          Email adderss:
        </label>
        <input
          className="input form__container-input"
          name="email"
          id="email-input"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <label
          className="form__container-label"
          htmlFor="profile-picture-input"
        >
          Profile picture:
        </label>
        <div className="user-picture-container">
          <img
            className="image user-picture"
            src={userInfo.image === "" ? icon : userInfo.image}
            alt="user"
          />
          <button
            type="button"
            className="button button-medium form__container-input form__container-button upload-picture-button"
          >
            <label className="upload-picture-button__label">
              Upload picture
              <input
                id="image-input"
                accept=".jpg, .jpeg, .png"
                type="file"
                onChange={handleAddImage}
              />
            </label>
          </button>
        </div>
        <input
          className="button button-medium form__container-input form__container-button
                     button-submit"
          type="button"
          onClick={handleSubmit}
          value="Update profile"
        />
      </div>
    </form>
  );
}

export default UserProfile;
