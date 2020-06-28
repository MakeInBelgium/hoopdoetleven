import React from "react";
import classnames from "classnames";

export default ({ btnStyle, large = false, children, ...props}) => {
    const typeAllowed = ["primary", "secondary", "outline-primary", "outline-secondary"].indexOf(btnStyle) !== -1;

    return <button
        className={classnames("btn", {
            'btn-default': !typeAllowed,
            'btn-lg': large,
            [`btn-${btnStyle}`]: typeAllowed,
        })}
        {...props}
    >
        {children}
    </button>;
};
