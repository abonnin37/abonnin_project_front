import React, {useContext} from "react";
import { useHistory, NavLink } from 'react-router-dom';

import style from './menu-list.module.scss';
import AuthContext from "../../../store/auth-context";

const MenuList = ({setShowMenu}) => {
    const history = useHistory();
    const {isLoggedIn, isAdmin} = useContext(AuthContext);

    const handleClick = (link) => {
        if (setShowMenu) {
            setShowMenu(false);
        }
        history.push(link);
    }

    return (
      <nav className={style.menuList}>
          <ul>
              <li onClick={() => handleClick("/acceuil")}>
                  <NavLink activeClassName={style.active} to="/acceuil">Acceuil</NavLink>
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
          </ul>
      </nav>  
    );
}

export default MenuList;