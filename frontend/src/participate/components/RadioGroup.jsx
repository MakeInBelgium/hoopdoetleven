import React from "react";
import {Field} from "react-final-form";
import FormGroupWithValidation from "./FormGroupWithValidation";

export default ({ options = [], isRequired = false, name, label, ...restProps }) => <FormGroupWithValidation isRequired={isRequired} name={name} {...restProps}>
    <label htmlFor={name}>{label || name}</label>
    <div>
        {options.map(({value, label: optionLabel}) => (
            <div className="form-check form-check-inline" key={`${name}-${value}`}>
                <Field
                    name={name}
                    id={`${name}-${value}`}
                    component="input"
                    type="radio"
                    value={value}
                    className="form-check-input"
                />
                <label htmlFor={`${name}-${value}`} className="form-check-label">{optionLabel}</label>
            </div>
        ))}
    </div>
</FormGroupWithValidation>;
