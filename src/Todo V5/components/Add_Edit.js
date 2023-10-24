import { Icon, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";

const Add_Edit = () => {
  return (
    <div
      style={{
        width: "800px",
      }}
    >
      <FormGroup
        helperText="Helper text with details..."
        label="User Name"
        labelFor="text-input"
        labelInfo={<Icon icon="asterisk" intent={Intent.DANGER} size={16} />}
      >
        <InputGroup id="text-input" placeholder="Placeholder text" />
      </FormGroup>
      <FormGroup
        helperText="Helper text with details..."
        label="Email"
        labelFor="text-input"
        labelInfo={<Icon icon="asterisk" intent={Intent.DANGER} />}
      >
        <InputGroup id="text-input" placeholder="Placeholder text" />
      </FormGroup>
    </div>
  );
};

export default Add_Edit;
