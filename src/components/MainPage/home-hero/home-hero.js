import React, {useEffect, useState} from 'react';

import style from './home-hero.module.scss';
import Banner from "/src/assets/images/home-hero-banner.jpg";
import RightArrow from "/src/assets/images/right-arrow.svg";
import {SlideModal} from "../../Layout/slide-modal/slide-modal";
import ProspectModal from "./prospect-modal/prospect-modal";

const HomeHero = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        if (openModal) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
    }, [openModal])

    return (
        <div id={"home"} className={style.homeHero}>
            <div className={style.homeHeroContainer}>
                <h1 className={style.title}>Alexandre Bonnin</h1>
                <div className={style.contentHomeHero}>
                    <div className={style.cvLink}>
                        <RightArrow />
                        <div onClick={() => setOpenModal(!openModal)}>Obtenir mon CV</div>
                    </div>
                    <div className={style.banner}>
                        <img src={Banner} alt=""/>
                    </div>
                    <div className={style.descriptionGroup}>
                        <h2>
                            Ingénieur informatique engagé
                        </h2>
                        <p>
                            J’ai 25 ans, je suis né à Tours et j’ai fait mes études à Rennes dans une école du groupe INSA.
                        </p>
                        <p></p>
                        <p>
                            Ce qui m’anime dans mon métier, c’est de mettre l’informatique au service de mes partenaires. J’aime voir mes créations comme autant d’outils participant à la réalisation d’un objectif supérieur. L’informatique web me permet également de mettre de concert des compétences très diverses, chaque projet est un nouveau défi.
                        </p>
                        <p></p>
                        <p>
                            Je partage mon temps entre une activité rémunérée et une activité bénévole auprès de collectifs, d’associations et d’ONG qui travaillent à une société plus écologique, plus démocratique et plus humaine.
                        </p>
                    </div>

                    <div className={style.colRight}>
                        <div className={style.slash}/>
                        <div className={style.bannerDate}>
                            <p>1997 - {new Date().getFullYear() /* dayjs */}</p>
                        </div>
                    </div>

                    <SlideModal open={openModal} setOpen={setOpenModal} mode={"fade"}>
                        <ProspectModal handleCloseModal={handleCloseModal}/>
                    </SlideModal>
                </div>
            </div>
        </div>
    );

}

export default HomeHero;