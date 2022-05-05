import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Slide, Fade} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import style from "./slide-modal.module.scss";

const useStyles = makeStyles({
    modal: {
        overflowY: "initial",
        display: "flex",
        justifyContent: ({mode}) => {
            if (mode === "slide")
                return "initial";
            else
                return "center";
        },
        alignItems: ({mode}) => {
            if (mode === "slide")
                return "initial";
            else
                return "center";
        }
    },
});

export const SlideModal = ({open, setOpen, children, mode = "slide"}) => {
    const classes = useStyles({mode});

    const handleClose = () => {
        setOpen(false);
    };

    const handleOverflow = () => {
        const modal = document.getElementsByClassName(classes.modal)[0];
        if (modal) {
            if (modal.style.overflowY === "auto") {
                modal.style.overflowY = "initial";
            } else {
                modal.style.overflowY = "auto";
            }
        }
    }

    return (
        <div className={style.slideModal}>
            <Modal
                open={open}
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {mode === "fade" ?
                    <Fade in={open}>
                        <div className={style.childrenContainer}>
                            {children}
                        </div>
                    </Fade>
                    :
                    <Slide in={open} direction={"left"} mountOnEnter unmountOnExit timeout={500} addEndListener={() => handleOverflow()}>
                        <div className={style.childrenContainer}>
                            {children}
                        </div>
                    </Slide>
                }
            </Modal>
        </div>
    );
}