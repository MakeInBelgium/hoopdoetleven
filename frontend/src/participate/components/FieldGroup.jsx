import React from "react";
import FormGroupWithValidation from "./FormGroupWithValidation";
import FormField from "./FormField";

export default ({ name, label, type = "text", component = "input", isRequired = false, ...fieldProps }) => {
    return <FormGroupWithValidation isRequired={isRequired} name={name}>
        <label htmlFor={name}>{label || name}</label>
        <FormField
            name={name}
            component={component}
            type={type}
            isRequired={isRequired}
            {...fieldProps}
        />
    </FormGroupWithValidation>;
};
