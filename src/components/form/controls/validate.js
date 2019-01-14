import React from "react";

import "./validate.css";

export default function validate(Input) {
  return class extends React.Component {
    render() {
      const { id, required, pristine, valid, label, ...props } = this.props;
      return (
        <FormGroup
          controlId={id}
          validationState={
            !required || pristine ? null : valid ? "success" : "error"
          }
        >
          {label && <ControlLabel>{label}</ControlLabel>}
          <Input {...props} />
        </FormGroup>
      );
    }
  };
}
