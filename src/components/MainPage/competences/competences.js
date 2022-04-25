import React from 'react';

import style from './competences.module.scss';
import Langues from '/src/assets/images/langues.svg';
import ComputerScience from '/src/assets/images/computer-science.svg';
import {useMedia} from "use-media";

const Competences = () => {
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);

    return (
      <div id={"competencies"} className={style.competences}>
          <div className={style.competencesContainer}>
              <div className={style.itemTitle}>
                  <h1>
                      <span>Mes<br/>compétences</span>
                      <div className={style.background} />
                      <div className={style.square} />
                  </h1>
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
                          <li>Portugais (du Brésil)</li>
                          <li>Espagnol</li>
                      </ul>
                  </div>
              </div>
              <div className={style.itemComputer}>
                  {!isMobile &&
                      <div className={style.icon}>
                          <ComputerScience />
                      </div>
                  }
                  <div className={style.textGroup}>
                      <div>
                          <h2>Compétences informatiques</h2>
                      </div>
                      <div>
                          <h3>Back-end</h3>
                          <ul>
                              <li>SQL</li>
                              <li>PHP</li>
                              <li>Symfony</li>
                              <li>API Platform</li>
                          </ul>
                      </div>
                      <div>
                          <h3>Front-end</h3>
                          <ul>
                              <li>HTML</li>
                              <li>CSS</li>
                              <li>Javascript</li>
                              <li>Typescript</li>
                              <li>React</li>
                          </ul>
                      </div>
                      <div>
                          <h3>CRM</h3>
                          <ul>
                              <li>Wordpress</li>
                              <li>Moodle</li>
                          </ul>
                      </div>
                      <div>
                          <h3>Autre</h3>
                          <ul>
                              <li>Microsoft Project</li>
                              <li>UML</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default Competences;