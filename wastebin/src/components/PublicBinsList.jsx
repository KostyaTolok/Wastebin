import React, { useEffect, useState } from "react";
import { db } from "../db/bin-database";
import "./bins-list.css";
import BinsList from "./BinsList";

function PublicBinsList() {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    let temp_bins = [];
    db.getPublicCodeBins()
      .then((snapshot) => {
        snapshot.docs.forEach((bin) => {
          temp_bins.push({ id: bin.id, data: bin.data() });
        });
        setBins(temp_bins);
      })
      .catch((error) => {
        console.error("Error getting bins: ", error);
      });
  }, []);

  return (
    <div className="bins-list">
      <h3 className="title bins-list__title">Public bins</h3>
      <BinsList bins={bins} />
    </div>
  );
}

export default PublicBinsList;
