import React from "react";
import classnames from "classnames";

export default ({ style, large = false, children, ...props}) => {
    const typeAllowed = ["primary", "secondary", "outline-primary", "outline-secondary"].indexOf(style) !== -1;

    return <button
        className={classnames("btn", {
            'btn-default': !typeAllowed,
            'btn-lg': large,
            [`btn-${style}`]: typeAllowed,
        })}
        {...props}
    >
        {children}
    </button>;
};
