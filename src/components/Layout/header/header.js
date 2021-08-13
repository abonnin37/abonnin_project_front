import React, {useEffect, useState, useRef, useContext} from 'react';
import {useMedia} from "use-media";
import MenuList from "../menu-list/menu-list";

import style from './header.module.scss';
import Logo from "/src/assets/images/logo.svg";
import {Link, NavLink} from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import {toast} from "react-hot-toast";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const headerEl = useRef(null);
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);
    const {isLoggedIn, logout} = useContext(AuthContext);

    // We put a listener on the showMenu property to open and close the side menu
    useEffect(() => {
        if (showMenu){
            document.getElementsByClassName(style.sideMenuMobile)[0].style.transform = "translate(0, 0)";
            document.getElementsByTagName('body')[0].style.height = "100%";
            document.getElementsByTagName('html')[0].style.overflow = "hidden";
        } else {
            document.getElementsByClassName(style.sideMenuMobile)[0].style.transform = "translate(-100%, 0)";
            document.getElementsByTagName('body')[0].style.height = "auto";
            document.getElementsByTagName('html')[0].style.overflow = "auto";
        }
    }, [showMenu]);

    // Manages the header background according to the scroll
    function backgroundHeaderHandler () {
        if (window.pageYOffset - 20 > style.menuHeight) {
            headerEl.current.style.background = style.lightGreen;
        } else {
            headerEl.current.style.background = 'transparent';
        }
    }

    // Each time the component is updated we run an eventListener on the scroll to see if we needs to change the background
    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", backgroundHeaderHandler);
        }
        watchScroll();

        return () => {
            window.removeEventListener("scroll", backgroundHeaderHandler);
        };
    });

    const logoutHandler = () => {
        if (logout()) {
            toast.success("Vous avez bien été déconnecté");
        }
    }
    return (
        <header className={style.header}>
            <div className={style.container} ref={headerEl}>
                <div className={style.logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                {
                    isMobile ?
                        <div className={style.menuMobileBurger} onClick={() => setShowMenu(!showMenu)}>
                            <input type="checkbox" checked={showMenu}/>

                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        :
                        <div className={style.menu}>
                            <MenuList/>
                        </div>
                }
                { isLoggedIn ?
                    <div className={style.logoutBtn} onClick={logoutHandler}>
                        Déconnexion
                    </div>
                    :
                    <Link to="/login" className={style.loginBtn}>Connexion</Link>
                }

                <div className={style.sideMenuMobile}>
                    <MenuList setShowMenu={setShowMenu}/>
                </div>
            </div>
        </header>
    );
}

export default Header;