import React from "react";
import { useHistory, NavLink } from 'react-router-dom';

import style from './menu-list.module.scss';

const MenuList = ({setShowMenu}) => {
    const history = useHistory();

    const handleClick = (link) => {
        setShowMenu(false);
        history.push(link);
    }

    return (
      <nav className={style.menuList}>
          <ul>
              <li onClick={() => handleClick("/acceuil")}>
                  <NavLink activeClassName={style.active} to="/acceuil">Acceuil</NavLink>
              </li>
              <li onClick={() => handleClick("/adminMainPage")}>
                  <NavLink activeClassName={style.active} to="/adminMainPage">Admin Main Page</NavLink>
              </li>
              <li onClick={() => handleClick("/blog")}>
                  <NavLink activeClassName={style.active} to="/blog">Blog</NavLink>
              </li>
              <li onClick={() => handleClick("/adminBlog")}>
                  <NavLink activeClassName={style.active} to="/adminBlog">Admin Blog</NavLink>
              </li>
          </ul>
      </nav>  
    );
}

export default MenuList;