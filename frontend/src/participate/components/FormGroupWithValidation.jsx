import React from "react";
import {Field} from "react-final-form";
import FormGroup from "./FormGroup";

export default ({ name, ...props }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            <FormGroup touched={touched} error={error} name={name} {...props} />
        }
    />
);
