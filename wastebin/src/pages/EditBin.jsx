import React from "react";
import BinForm from "../components/BinForm";

function EditBin(props) {
  return <BinForm name="Edit bin" updateSideBin={props.updateSideBin} />;
}

export default EditBin;
