import React from "react";
import {Button as MaterialUIButton} from "@material-ui/core"

import style from "./button.module.scss";
import clsx from "clsx";

export const Button = ({variant = "contained", color = "primary", disabled = false, className, children, ...props}) => {
    return (
        <MaterialUIButton className={clsx(style.button, className)} variant={variant} color={color} disabled={disabled} {...props}>
            {children}
        </MaterialUIButton>
    );
}