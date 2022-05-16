import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import icon from "../images/user-icon.jpg";
import calendar from "../images/calendar.png";
import { db } from "../db/bin-database";
import { binAuth } from "../auth/bin-auth";
import "./user-info.css";

function UserBins() {
  const [bins, setBins] = useState([]);
  const [userName, setUserName] = useState("");
  const [userDate, setUserDate] = useState("");

  useEffect(() => {
    let temp_bins = [];
    binAuth.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        db.getCodeBinsByUserId(binAuth.getCurrentUserId())
          .then((snapshot) => {
            snapshot.docs.forEach((bin) => {
              temp_bins.push({ id: bin.id, data: bin.data() });
            });
            setBins(temp_bins);
          })
          .catch((error) => {
            console.error("Error getting bins: ", error);
          });

        setUserName(binAuth.user.displayName);
        binAuth.getUserProfile(binAuth.user.uid).then((user) => {
          setUserDate(user.data().registrationDate);
        });

        let userImage = document.getElementById("user-image");
        if (binAuth.user.photoURL) {
          binAuth.getUserPhotoUrl(binAuth.user.photoURL).then((url) => {
            userImage.setAttribute("src", url);
          });
        }
      }
    });
  }, [setBins, setUserName, setUserDate]);

  return (
    <>
      <div className="user-info">
        <img
          className="image user-info__image"
          id="user-image"
          src={icon}
          alt="User"
        />
        <div className="user-details">
          <p className="user-details__user-name">{userName}</p>
          <p className="statistics">
            <img src={calendar} className="statistics__icon" alt="calendar" />
            <span id="user-registration-date">{userDate}</span>
          </p>
        </div>
      </div>
      <Outlet context={[bins, setBins]} />
    </>
  );
}

export default UserBins;
