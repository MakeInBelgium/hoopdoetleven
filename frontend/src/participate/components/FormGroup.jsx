import React from "react";
import classnames from "classnames";

export default ({ name, children, showErrors = true, touched, error, isRequired = false, ...props }) => <div
    className={classnames("form-group", "needs-validation", {
        "was-validated": touched,
        "is-invalid": touched && error,
        "is-valid": touched && !error,
        "required": isRequired,
    })}
    {...props}>
    {children}
    {(showErrors && (touched && error)) && (<div className="invalid-feedback">{error}</div>)}
</div>;
