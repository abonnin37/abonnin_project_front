import React from "react";
import { NavLink } from 'react-router-dom';

import style from './menu-list.module.scss';

const MenuList = () => {
    return (
      <nav className={style.menuList}>
          <ul>
              <li>
                  <NavLink activeClassName={style.active} to="/acceuil">Acceuil</NavLink>
              </li>
              <li>
                  <NavLink activeClassName={style.active} to="/blog">Blog</NavLink>
              </li>
              <li>
                  <NavLink activeClassName={style.active} to="/adminBlog">Admin Blog</NavLink>
              </li>
          </ul>
      </nav>  
    );
}

export default MenuList;