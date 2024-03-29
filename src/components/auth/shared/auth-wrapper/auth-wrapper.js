import React from "react";
import {useHistory} from "react-router-dom";

import style from "./auth-wrapper.module.scss";
import HomeIcon from '@material-ui/icons/Home';

export const AuthWrapper = ({title, children}) => {
    const history = useHistory();

    return (
        <div className={style.wrapper}>
            <div className={style.wrapperContent}>
                <h1 className={style.header}>{title}</h1>

                <div className={style.children}>
                    {children}
                </div>
                <div className={style.home} onClick={() => history.replace("/accueil", )}>
                    <HomeIcon />
                    accueil
                </div>
            </div>
        </div>
    );

}