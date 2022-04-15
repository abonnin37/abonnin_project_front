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
                        <div onClick={() => setOpenModal(!openModal)}>Lien vers mon CV</div>
                    </div>
                    <div className={style.banner}>
                        <img src={Banner} alt=""/>
                    </div>
                    <div className={style.descriptionGroup}>
                        <h2>
                            Je suis un ingénieur en informatique passionné par le développement web.
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Aliquam aspernatur, commodi culpa eius est id impedit incidunt ipsum maxime nostrum,
                            obcaecati perspiciatis quo, quod repellat sint tempore temporibus vitae voluptates?

                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Aliquam aspernatur, commodi culpa eius est id impedit incidunt ipsum maxime nostrum,
                            obcaecati perspiciatis quo, quod repellat sint tempore temporibus vitae voluptates?

                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Aliquam aspernatur, commodi culpa eius est id impedit incidunt ipsum maxime nostrum,
                            obcaecati perspiciatis quo, quod repellat sint tempore temporibus vitae voluptates?
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