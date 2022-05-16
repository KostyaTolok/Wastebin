import React, { useState } from "react";
import { useOutletContext } from "react-router";
import BinsList from "./BinsList";
import search from "../images/search.png";

function UserBinsList() {
  const [bins, setBins] = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    let newBins = [];
    if (event.target.value.length > 0) {
      bins.forEach((bin) => {
        if (bin.data.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          newBins.push(bin);
        }
      });
    } else {
      newBins = bins;
    }
    setBins(newBins);
  }
  return (
    <>
      <div class="bins-list">
        <h3 class="title bins-list__title">User bins</h3>
        <div class="search-container">
          <form action="post">
            <input
              class="search-container__input"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button type="button" class="search-container__submit">
              <img
                src={search}
                class="search-container__submit-icon"
                alt="search"
              />
            </button>
          </form>
        </div>
        <BinsList bins={bins} />
      </div>
    </>
  );
}

export default UserBinsList;
