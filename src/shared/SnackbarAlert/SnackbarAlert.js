import React, {useEffect, useState} from "react";
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SnackbarAlert = ({severity, errorMessage, successMessage, fireOn}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    useEffect(() => {
        setOpenSnackbar(true);
    }, [fireOn]);

    return (
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                { severity === "error" &&
                errorMessage
                }
                { severity === "success" &&
                successMessage
                }
            </Alert>
        </Snackbar>
    );
}