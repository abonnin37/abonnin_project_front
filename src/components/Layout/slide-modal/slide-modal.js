import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Slide} from "@material-ui/core";

import style from "./slide-modal.module.scss";

export const SlideModal = ({open, setOpen, children}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={style.slideModal}>
            <Modal
                className={style.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open} direction={"left"} mountOnEnter unmountOnExit timeout={500}>
                    <div className={style.childrenContainer}>
                        {children}
                    </div>
                </Slide>
            </Modal>
        </div>
    );
}