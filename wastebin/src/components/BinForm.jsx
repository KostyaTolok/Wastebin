import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { binAuth } from "../auth/bin-auth";
import { db } from "../db/bin-database";
import { CodeBin } from "../db/models/code-bin";
import ErrorsList from "./ErrorsList";
import PasswordCheckbox from "./PasswordCheckbox";

function BinForm(props) {
  const navigate = useNavigate();
  const [binState, setBinState] = useState({
    code: "",
    title: "",
    syntaxHighlighting: "None",
    expiration: "Never",
    publicity: "Public",
    createdDate: "",
    password: "",
    passwordCheckbox: false,
    passwordTitle: "Disabled",
  });
  const [passwordInputState, setPasswordInput] = useState("disabled");
  const [errors, setErrors] = useState([]);
  const params = useParams();
  const binId = params.id;
  const languages = [
    "None",
    "C",
    "C++",
    "C#",
    "Python",
    "JavaScript",
    "Html",
    "CSS",
  ];
  const expirationOptions = [
    "Never",
    "Burn after read",
    "10 minutes",
    "1 day",
    "1 week",
    "1 month",
    "6 months",
    "1 year",
  ];

  useEffect(() => {
    if (binId) {
      db.getCodeBin(binId)
        .then((bin) => {
          binAuth.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
              db.isOwner(binId, binAuth.getCurrentUserId()).then((isOwner) => {
                if (isOwner) {
                  setBinState({
                    code: bin.data().code,
                    title: bin.data().title,
                    syntaxHighlighting: bin.data().syntaxHighlighting,
                    expiration: bin.data().expiration,
                    publicity: bin.data().publicity,
                    createdDate: bin.data().createdDate,
                    password: bin.data().password,
                    passwordCheckbox: bin.data().password !== "",
                    passwordTitle:
                      bin.data().password !== "" ? "Enabled" : "Disabled",
                  });
                  if (bin.data().password !== "") {
                    setPasswordInput("enabled");
                  } else {
                    setPasswordInput("disabled");
                  }
                } else {
                  alert("You are not the owner of this bin");
                  navigate(-1);
                }
              });
            } else {
              alert("You need to be logged in to view this bin");
              navigate("/login");
            }
          });
        })
        .catch((error) => {
          console.error("Error getting bins: ", error);
        });
    }
  }, [binId, navigate, setBinState]);

  function handleChange(event) {
    setBinState({
      ...binState,
      [event.target.name]: event.target.value,
    });
  }

  function handlePasswordCheckboxChange() {
    setBinState({
      ...binState,
      passwordCheckbox: !binState.passwordCheckbox,
      passwordTitle: binState.passwordCheckbox ? "Disabled" : "Enabled",
    });

    if (!binState.passwordCheckbox) {
      setPasswordInput("enabled");
    } else {
      setPasswordInput("disabled");
    }
  }

  function checkTab(element, event) {
    let code = element.value;
    if (event.key === "Tab") {
      event.preventDefault();
      let beforeTab = code.slice(0, element.selectionStart);
      let afterTab = code.slice(element.selectionEnd, element.value.length);
      let cursorPos = element.selectionEnd + 1;
      element.value = beforeTab + "\t" + afterTab;

      element.selectionStart = cursorPos;
      element.selectionEnd = cursorPos;
    }
  }

  function handleSubmit() {
    let tempTitle = binState.title;
    if (tempTitle === "") {
      tempTitle = "Untitled";
    }

    let tempErrors = checkBinForm();

    if (tempErrors.length > 0) {
      setErrors(tempErrors);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (!binId) {
        let userId = null;
        if (binAuth.auth.currentUser) {
          userId = binAuth.getCurrentUserId();
        }

        let newBin = new CodeBin(
          binState.code,
          binState.syntaxHighlighting,
          binState.expiration,
          binState.publicity,
          binState.password,
          tempTitle,
          userId,
          new Date(),
          0
        );

        db.addCodeBin(newBin)
          .then((bin) => {
            console.log("Bin added with ID: ", bin.id);
            binAuth.addBinAccess(bin.id).then(() => {
              if (binState.publicity === "Public") {
                newBin.createdDate = newBin.createdDate.toDateString();
                let sideBin = {
                  id: bin.id,
                  data: newBin,
                  userName: binAuth.user.displayName,
                };
                props.addSideBin(sideBin);
              }
              navigate("/public-bins/" + bin.id);
            });
          })
          .catch((error) => {
            console.error("Error adding bin: ", error);
          });
      } else {
        let currentBin = new CodeBin(
          binState.code,
          binState.syntaxHighlighting,
          binState.expiration,
          binState.publicity,
          binState.password,
          tempTitle
        );

        db.updateCodeBin(binId, currentBin)
          .then(() => {
            console.log("Bin updated with ID: ", binId);
            if (binState.publicity === "Public") {
              currentBin.createdDate = binState.createdDate;
              let sideBin = {
                id: binId,
                data: currentBin,
                userName: binAuth.user.displayName,
              };
              props.updateSideBin(sideBin);
            }
            navigate("/public-bins/" + binId);
          })
          .catch((error) => {
            console.error("Error updating bin: ", error);
          });
      }
    }
  }

  function checkBinForm() {
    let temp_errors = [];

    if (binState.code === "") {
      temp_errors.push("You cannot create empty bin");
    }

    if (binState.passwordCheckbox && binState.password === "") {
      temp_errors.push("Please enter a password");
    }

    return temp_errors;
  }

  return (
    <form className="form" method="POST">
      <ErrorsList errors={errors} />
      <p className="title form__title">{props.name}</p>
      <textarea
        name="code"
        className="code-area"
        onKeyDown={(e) => checkTab(e.target, e)}
        value={binState.code}
        onChange={handleChange}
      ></textarea>
      <p className="title form__title">Configure your bin:</p>
      <div className="form__container">
        <label className="form__container-label" htmlFor="syntax">
          Syntax Highlighting:
        </label>

        <select
          className="form__container-input form__container-select"
          name="syntaxHighlighting"
          id="syntax-highlighting-select"
          value={binState.syntaxHighlighting}
          onChange={handleChange}
        >
          {languages.map((language, index) => {
            return (
              <option key={index} value={language}>
                {language}
              </option>
            );
          })}
        </select>
        <label className="form__container-label" htmlFor="expiration">
          Bin Expiration:
        </label>
        <select
          className="form__container-input form__container-select"
          name="expiration"
          id="bin-expiration-select"
          value={binState.expiration}
          onChange={handleChange}
        >
          {expirationOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <label className="form__container-label" htmlFor="publicity">
          Bin Publicity:
        </label>
        <select
          className="form__container-input form__container-select"
          name="publicity"
          id="bin-publicity-select"
          value={binState.publicity}
          onChange={handleChange}
        >
          <option>Public</option>
          <option>Private</option>
        </select>

        <label className="form__container-label" htmlFor="password-checkbox">
          Password:
        </label>
        <PasswordCheckbox
          passwordCheckbox={binState.passwordCheckbox}
          passwordTitle={binState.passwordTitle}
          handlePasswordCheckboxChange={handlePasswordCheckboxChange}
        />
        <input
          className={`form__container-input password-input ${passwordInputState}`}
          name="password"
          id="password-input"
          type="password"
          value={binState.password}
          disabled={!binState.passwordCheckbox}
          onChange={handleChange}
        />
        <label className="form__container-label" htmlFor="title-input">
          Title:
        </label>
        <input
          className="form__container-input"
          name="title"
          id="title-input"
          type="text"
          value={binState.title}
          onChange={handleChange}
        />
        <input
          className="button button-medium form__container-input form__container-button button-submit"
          type="button"
          id="add-bin-button"
          onClick={handleSubmit}
          value="Submit bin"
        />
      </div>
    </form>
  );
}

export default BinForm;
