import React from 'react';

function Error(props) {
  return (
    <div>
      <h3>Error:</h3>
      <p>{props.error}</p>
    </div>
  );
}

export default Error;