import React from "react";
import BinForm from "../components/BinForm";

function Home(props) {
  return <BinForm name="New bin" addSideBin={props.addSideBin} />;
}

export default Home;
