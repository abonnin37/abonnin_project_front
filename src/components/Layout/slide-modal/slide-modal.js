import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Slide, Fade} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import style from "./slide-modal.module.scss";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const SlideModal = ({open, setOpen, children, mode = "slide"}) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Slide in={open} direction={"left"} mountOnEnter unmountOnExit timeout={500}>
                        <div className={style.childrenContainer}>
                            {children}
                        </div>
                    </Slide>
                }
            </Modal>
        </div>
    );
}