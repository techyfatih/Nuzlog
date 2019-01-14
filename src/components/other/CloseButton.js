import React from "react";

export default props => {
  return (
    <Button
      className="close"
      aria-label="Close"
      onClick={props.onClick}
      tabIndex={-1}
    >
      <span aria-hidden="true">&times;</span>
    </Button>
  );
};
