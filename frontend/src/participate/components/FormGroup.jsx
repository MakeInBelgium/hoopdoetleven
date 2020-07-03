import React from "react";
import classnames from "classnames";

export default ({ name, children, showErrors = true, touched, error, isRequired = false, ...props }) => { 
    const hasError = (showErrors && (touched && !!error));

    return (<div
    className={classnames("form-group", "needs-validation", {
        "is-invalid": touched && error,
        "is-valid": touched && !error,
        "required": isRequired,
    })}
    {...props}>
    {children && React.Children.map(children, child => React.cloneElement(child, {
        ...child.props,
        hasError,
        touched,
    }))}
    {hasError && (<div className="invalid-feedback">{error}</div>)}
</div>)
};
