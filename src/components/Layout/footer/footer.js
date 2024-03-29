import React from 'react';

import style from './footer.module.scss';
import Logo from "/src/assets/images/logo.svg";
import {NavLink} from "react-router-dom";
import dayjs from "dayjs";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.mainContainer}>
                <div className={style.logoGroup}>
                    <Logo />
                    <h1>Alexandre Bonnin</h1>
                </div>
                <div className={style.linksGroup}>

                </div>
                <div className={style.menu}>
                    <nav>
                        <ul>
                            <li>
                                <NavLink activeClassName={style.active} to="/accueil">accueil</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={style.active} to="/blog">Blog</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={style.outerLinks}>
                    <a target="_blank" href="https://www.linkedin.com/in/alexandre-bonnin-224574153/">linkedin</a>
                    <a target="_blank" href="https://www.malt.fr/profile/alexandrebonnin">malt</a>
                </div>
            </div>
            <div className={style.legal}>
                <NavLink to="/legal">Mentions légales</NavLink>
                © {dayjs().year()} Alexandre Bonnin
            </div>
        </footer>
    );
}

export default Footer;