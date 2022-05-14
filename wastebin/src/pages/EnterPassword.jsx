import React, { useEffect, useState } from "react";
import { binAuth } from "../auth/bin-auth";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { db } from "../db/bin-database";
import ErrorsList from "../components/ErrorsList";

function EnterPassword() {
  const [binPassword, setBinPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const params = useParams();
  const binId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (binId) {
      db.getCodeBin(binId).then((bin) => {
        setBinPassword(bin.data().password);
      });
    }
  }, [binId]);

  function submitBinPasswordForm() {
    var tempErrors = [];

    if (password === "") {
      errors.push("Bin password cannot be blank");
    }

    if (binPassword !== "") {
      if (password !== binPassword) {
        tempErrors.push("Incorrect bin password");
      }
    } else {
      tempErrors.push("Bin does not exist");
    }

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      binAuth.addBinAccess(binId).then(() => {
        navigate(-1);
      });
    }
  }

  return (
    <form className="form" method="POST" encType="multipart/form-data">
      <ErrorsList errors={errors} />
      <h3 className="title form__title">Enter password to access bin:</h3>
      <div className="form__container">
        <label className="form__container-label" htmlFor="new-password-input">
          Bin password:
        </label>
        <input
          className="input form__container-input"
          name="password"
          id="bin-password-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className="button button-medium form__container-input form__container-button button-submit"
          type="button"
          onClick={submitBinPasswordForm}
          value="Submit"
        />
      </div>
    </form>
  );
}

export default EnterPassword;
