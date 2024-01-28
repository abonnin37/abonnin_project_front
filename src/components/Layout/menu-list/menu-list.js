import React, {useContext, useEffect, useState} from "react";
import {useHistory, NavLink, useLocation} from 'react-router-dom';
import { NavHashLink} from "react-router-hash-link";

import style from './menu-list.module.scss';
import AuthContext from "../../../store/auth-context";
import {useMedia} from "use-media";

const MenuList = ({setShowMenu}) => {
    const history = useHistory();
    const {isLoggedIn, isAdmin} = useContext(AuthContext);
    const isTablet = useMedia(`(max-width: ${style.tabletBreakpoint})`);
    const [isHome, setIsHome] = useState(history.location.pathname === "/accueil");
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/accueil" || pathname === "/") {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
    }, [pathname]);

    const handleClick = (link) => {
        if (setShowMenu) {
            setShowMenu(false);
        }
        history.push(link);
    }

    const scrollWithOffset = (el, offset, offsetTablet) => {
        window.scrollTo({ top: el.offsetTop + (isTablet ? offsetTablet : offset), behavior: 'smooth' });
    }

    return (
      <nav className={style.menuList}>
          <ul>
              { isHome ?
                  <>
                      <li onClick={() => handleClick("#home")}>
                          <NavHashLink to={"#home"}>Accueil</NavHashLink>
                      </li>
                      <li onClick={() => handleClick("#projects")}>
                          <NavHashLink to={"#projects"} scroll={el => scrollWithOffset(el, -122, -98.39)}>Projets</NavHashLink>
                      </li>
                      <li onClick={() => handleClick("#recommendations")}>
                          <NavHashLink to={"#recommendations"} scroll={el => scrollWithOffset(el, -122, -98.39)}>Recommendations</NavHashLink>
                      </li>
                      <li onClick={() => handleClick("#competencies")}>
                          <NavHashLink to={"#competencies"} scroll={el => scrollWithOffset(el, -122, -98.39)}>Compétences</NavHashLink>
                      </li>
                      <li onClick={() => handleClick("#blog")}>
                          <NavHashLink to={"#blog"} scroll={el => scrollWithOffset(el, -122, -98.39)}>Blog</NavHashLink>
                      </li>
                      <li onClick={() => handleClick("#contact")}>
                          <NavHashLink to={"#contact"} scroll={el => scrollWithOffset(el, -122, -98.39)}>Contact</NavHashLink>
                      </li>
                  </>
                  :
                    <>
                        <li onClick={() => handleClick("/accueil")}>
                            <NavLink activeClassName={style.active} to="/accueil">accueil</NavLink>
                        </li>
                    </>
              }

              { isLoggedIn && isAdmin && <>
                  <li onClick={() => handleClick("/adminMainPage")}>
                      <NavLink activeClassName={style.active} to="/adminMainPage">Admin Main Page</NavLink>
                  </li>
                  <li onClick={() => handleClick("/adminBlog")}>
                      <NavLink activeClassName={style.active} to="/adminBlog">Admin Blog</NavLink>
                  </li>
              </>
              }
              {/*
                  <li onClick={() => handleClick("/accueil")}>
                      <NavLink activeClassName={style.active} to="/accueil">accueil</NavLink>
                  </li>
                  { isLoggedIn && isAdmin &&
                      <li onClick={() => handleClick("/adminMainPage")}>
                          <NavLink activeClassName={style.active} to="/adminMainPage">Admin Main Page</NavLink>
                      </li>
                  }
                  <li onClick={() => handleClick("/blog")}>
                      <NavLink activeClassName={style.active} to="/blog">Blog</NavLink>
                  </li>
                  { isLoggedIn && isAdmin &&
                      <li onClick={() => handleClick("/adminBlog")}>
                          <NavLink activeClassName={style.active} to="/adminBlog">Admin Blog</NavLink>
                      </li>
                  }
              */}
          </ul>
      </nav>  
    );
}

export default MenuList;