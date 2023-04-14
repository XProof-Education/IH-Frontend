import React from 'react';

function Error(props) {
  return (
    <div className={props.align !== "column" ? "error-component-div" : "error-component-div-column"}>
      <h3 className="error-message-h3">Error:</h3>
      <p>{props.error}</p>
    </div>
  );
}

export default Error;