import React from 'react';

import style from './footer.module.scss';
import Logo from "/src/assets/images/logo.svg";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.logoGroup}>
                <Logo />
                <h4>Alexandre Bonnin</h4>
            </div>
            <div className={style.menu}>

            </div>
            <div className={style.outerLinks}>
                <a href="">linkedin</a>
                <a href="">malt</a>
            </div>
        </footer>
    );
}

export default Footer;