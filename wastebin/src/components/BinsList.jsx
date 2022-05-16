import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bins-list.css";

function BinsList(props) {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    setBins(props.bins);
  }, [props.bins]);

  return (
    <dl className="bins-list__container">
      <dt className="bins-list__container-item">Title</dt>
      <dt className="bins-list__container-item">Added</dt>
      <dt className="bins-list__container-item">Expires</dt>
      <dt className="bins-list__container-item">Syntax</dt>
      <div className="bins-list__container-divider"></div>
      {bins.map((bin) => {
        return (
          <>
            <Link to={bin.id} className="bins-list__container-item">
              {bin.data.title}
            </Link>
            <p className="bins-list__container-item">{bin.data.createdDate}</p>
            <p className="bins-list__container-item">{bin.data.expiration}</p>
            <p className="bins-list__container-item">
              {bin.data.syntaxHighlighting}
            </p>
            <div className="bins-list__container-divider"></div>
          </>
        );
      })}
    </dl>
  );
}

export default BinsList;
