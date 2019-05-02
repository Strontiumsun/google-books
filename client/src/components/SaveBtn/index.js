import React from "react";

function SaveBtn(props) {
    return (
        <button className="btn btn-primary" {...props} tabIndex="0">
            Save Book</button>
    )
}

export default SaveBtn;