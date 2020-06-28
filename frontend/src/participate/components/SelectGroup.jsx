import React from "react";
import classnames from "classnames";
import FieldGroup from "./FieldGroup";

export default ({ options = [], name, label, ...restProps }) => <FieldGroup
    component="select"
    className={classnames("custom-select", className)}
    name={name}
    {...restProps}
>
    {options.map(({value, label: optionLabel}) => <option key={`${name}-${value}`} value={value}>{optionLabel}</option>)}
</FieldGroup>;
