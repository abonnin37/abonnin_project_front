import React from 'react';

import style from './competences.module.scss';
import Langues from '/src/assets/images/langues.svg';
import ComputerScience from '/src/assets/images/computer-science.svg';

const Competences = () => {
    return (
      <div className={style.competences}>
          <div className={style.itemTitle}>
              <h1>My<br/>competences</h1>
              <div className={style.emptySquare}></div>
          </div>
          <div className={style.itemLangues}>
              <div className={style.icon}>
                  <Langues />
              </div>
              <div className={style.textGroup}>
                  <h2>
                      Langues
                  </h2>
                  <ul>
                      <li>Français</li>
                      <li>Anglais</li>
                      <li>Portugais (brésilien)</li>
                      <li>Espagnol</li>
                  </ul>
              </div>
          </div>
          <div className={style.itemComputer}>
              <div className={style.icon}>
                  <ComputerScience />
              </div>
              <div className={style.textGroup}>
                  <div>
                      <h2>Computer science</h2>
                  </div>
                  <div>
                      <h3>Back-end</h3>
                      <ul>
                          <li>PHP ~ Symfony</li>
                          <li>C# ~ ASP.NET MVC</li>
                          <li>Java ~ Java Server Faces</li>
                      </ul>
                  </div>
                  <div>
                      <h3>Front-end</h3>
                      <ul>
                          <li>Javascript ~ React</li>
                          <li>HTML</li>
                          <li>CSS</li>
                      </ul>
                  </div>
                  <div>
                      <h3>CRM</h3>
                      <ul>
                          <li>Wordpress</li>
                      </ul>
                  </div>
                  <div>
                      <h3>Other</h3>
                      <ul>
                          <li>Microsoft Project</li>
                          <li>SQL</li>
                          <li>UML</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default Competences;