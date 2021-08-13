import React from "react";

import style from "./auth-wrapper.module.scss";

export const AuthWrapper = ({title, children}) => {
    return (
        <div className={style.wrapper}>
            <h1 className={style.header}>{title}</h1>

            <div className={style.children}>
                {children}
            </div>
        </div>
    );

}