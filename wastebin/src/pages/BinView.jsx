import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import calendar from "../images/calendar.png";
import eye from "../images/eye.png";
import clock from "../images/clock.png";
import { db } from "../db/bin-database";
import { binAuth } from "../auth/bin-auth";
import "./bin-view.css";
import Code from "../components/Code";

function BinView(props) {
  const params = useParams();
  const binId = params.id;
  const [bin, setBin] = useState({});
  const [views, setViews] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    db.getCodeBin(binId)
      .then((bin) => {
        if (bin.data().password !== "") {
          binAuth.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
              binAuth.getUserProfile(binAuth.user.uid).then((profile) => {
                if (!profile.data().binAccess.includes(binId)) {
                  navigate("/enter-password/" + binId);
                } else loadBin(bin.data());
              });
            } else {
              alert("You need to be logged in to view this bin");
              navigate("login.html");
            }
          });
        } else loadBin(bin.data());
      })
      .catch((error) => {
        console.error("Error getting bins: ", error);
      });

    function loadBin(bin) {
      let newViewsCount = bin.viewsCount + 1;

      db.updateBinViewsCount(binId, newViewsCount)
        .then(() => {
          setViews(newViewsCount);
        })
        .catch((error) => {
          console.error("Error updating views count: ", error);
        });

      binAuth
        .getUserProfile(bin.userId)
        .then((profile) => {
          setOwnerName(profile.data().name);
          if (profile.data().photoUrl) {
            binAuth.getUserPhotoUrl(profile.data().photoUrl).then((url) => {
              setOwnerImage(url);
            });
          }
        })
        .catch((error) => {
          console.error("Error getting user profile: ", error);
        });

      setBin(bin);
    }
  }, [binId, navigate]);

  function deleteBin() {
    binAuth.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        db.isOwner(binId, binAuth.getCurrentUserId()).then((isOwner) => {
          if (isOwner) {
            if (window.confirm("Do you really want to delete bin?")) {
              db.deleteCodeBin(binId)
                .then(() => {
                  console.log(`Bin with id ${binId} successfully deleted`);
                  binAuth.removeBinAccess(binId).then(() => {
                    props.removeSideBin(binId);
                    navigate("/");
                  });
                })
                .catch((error) => {
                  console.error("Error deleting bin: ", error);
                });
            }
          } else {
            alert("You are not the owner of this bin");
          }
        });
      } else {
        alert("You need to be logged in to delete this bin");
      }
    });
  }

  function getSyntax() {
    switch (bin.syntaxHighlighting) {
      case "javascript":
        return "js";
      case "C#":
        return "csharp";
      case "C++":
        return "cpp";
      default:
        return bin.syntaxHighlighting;
    }
  }

  return (
    <>
      <div className="bin-info">
        <img
          className="image bin-info__image"
          id="bin-owner-image"
          src={ownerImage}
          alt="user"
        />
        <div className="bin-info__details">
          <p className="title bin-info__title">{bin.title}</p>
          <p className="statistics">
            <span id="bin-owner-name">{ownerName}</span>
            <img src={calendar} className="statistics__icon" alt="calendar" />
            <span id="bin-created-date">{bin.createdDate}</span>
            <img src={eye} className="statistics__icon" alt="eye" />
            <span id="bin-views-count">{views}</span>
            <img src={clock} className="statistics__icon" alt="clock" />
            <span id="bin-expiration">{bin.expiration}</span>
          </p>
        </div>
      </div>
      <div className="top-area">
        <p className="top-area__left">{bin.syntaxHighlighting}</p>
        <div className="top-area__right">
          <Link
            to={`/edit-bin/${binId}`}
            id="edit-button"
            className="button button-small top-area__button"
          >
            Edit
          </Link>
          <a
            onClick={() => {
              deleteBin();
            }}
            href="#"
            className="button button-small top-area__button"
          >
            Delete
          </a>
        </div>
      </div>
      <Code code={bin.code} language={getSyntax()} />
    </>
  );
}

export default BinView;
