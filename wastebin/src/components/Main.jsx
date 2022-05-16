import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "./Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AsideBins from "./AsideBins";
import PublicBinsList from "./PublicBinsList";
import PublicBins from "../pages/PublicBins";
import BinView from "../pages/BinView";
import EditBin from "../pages/EditBin";
import UserBins from "../pages/UserBins";
import UserBinsList from "./UserBinsList";
import UserProfile from "../pages/UserProfile";
import { db } from "../db/bin-database";
import { binAuth } from "../auth/bin-auth";
import ChangePassword from "../pages/ChangePassword";
import EnterPassword from "../pages/EnterPassword";
import AboutUs from "../pages/AboutUs";

function Main() {
  const [bins, setBins] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
    image: "",
  });

  useEffect(() => {
    binAuth.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) {
        binAuth.getUserProfile(binAuth.getCurrentUserId()).then((profile) => {
          binAuth.getUserPhotoUrl(profile.data().photoUrl).then((photoUrl) => {
            setUserInfo({
              username: profile.data().name,
              image: photoUrl,
            });
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    let tempBins = [];
    db.getPublicCodeBins()
      .then((snapshot) => {
        snapshot.docs.forEach((bin) => {
          addSideBin(bin.data(), bin.id);
        });
      })
      .catch((error) => {
        console.error("Error getting bins: ", error);
      });

    function addSideBin(binData, id) {
      binAuth.getUserProfile(binData.userId).then((profile) => {
        let userName = profile.data().name;
        tempBins.push({ id: id, data: binData, userName: userName });
        setBins(tempBins);
      });
    }
  }, []);

  function addSideBin(bin) {
    setBins([bin, ...bins]);
  }

  function removeSideBin(id) {
    setBins(bins.filter((bin) => bin.id !== id));
  }

  function updateSideBin(bin) {
    setBins(bins.map((b) => (b.id === bin.id ? bin : b)));
  }

  function updateUserInfo(info) {
    setUserInfo(info);
    let binsToupdate = bins.map((bin) => {
      if (bin.data.userId === binAuth.user.uid) {
        return { ...bin, userName: info.username };
      } else {
        return bin;
      }
    });
    setBins(binsToupdate);
  }

  return (
    <>
      <Header userInfo={userInfo} />
      <div className="wrap">
        <main>
          <Routes>
            <Route path="/" element={<Home addSideBin={addSideBin} />} />
            <Route
              path="/login"
              element={<Login updateUserInfo={updateUserInfo} />}
            />
            <Route
              path="/register"
              element={<Register updateUserInfo={updateUserInfo} />}
            />
            <Route path="/public-bins" element={<PublicBins />}>
              <Route index element={<PublicBinsList />} />
              <Route
                path=":id"
                element={<BinView removeSideBin={removeSideBin} />}
              />
            </Route>
            <Route path="user-bins" element={<UserBins />}>
              <Route index element={<UserBinsList />} />
            </Route>
            <Route
              path="/user-bins/:id"
              element={<BinView removeSideBin={removeSideBin} />}
            />
            <Route
              path="/edit-bin/:id"
              element={<EditBin updateSideBin={updateSideBin} />}
            />
            <Route
              path="/user-profile"
              element={<UserProfile updateUserInfo={updateUserInfo} />}
            />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/enter-password/:id" element={<EnterPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <AsideBins bins={bins} />
      </div>
    </>
  );
}

export default Main;
