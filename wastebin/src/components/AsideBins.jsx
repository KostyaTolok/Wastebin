import React from "react";
import { Link } from "react-router-dom";

function AsideBins(props) {
  return (
    <aside>
      <nav>
        <ul className="aside-bins-list">
          <Link to="public-bins" className="title aside-bins-list__title">
            Public bins
          </Link>
          {props.bins.map((bin) => {
            return (
              <li key={bin.id} className="aside-bins-list__item">
                <Link
                  to={`/public-bins/${bin.id}`}
                  className="aside-bins-list__item-name"
                >
                  {bin.data.title}
                </Link>
                <p className="aside-bins-list__item-info">
                  {bin.userName} | {bin.data.createdDate} |{" "}
                  {bin.data.syntaxHighlighting}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBins;
