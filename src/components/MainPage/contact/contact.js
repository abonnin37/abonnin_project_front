import React, {useState, useEffect} from 'react';
import useForm from "../../../hooks/form/useForm";
import { contactForm } from "/src/utils/form/formConfig";

import style from "./contact.module.scss";

const Contact = () => {
    const { renderFormInputs, isFormValid } = useForm(contactForm);

    const formSubmissionHandler = () => {
        console.log("submit");
    }

    const FORM_ID = "contactForm";

    return (
        <div className={style.contact}>
            <h5>Hi ther, I'm Alex.</h5>
            <h1>Get in touch !</h1>
            <form id={FORM_ID} onSubmit={formSubmissionHandler} className={style.contactForm}>
                <div className={style.formControl}>
                    {renderFormInputs(FORM_ID)}
                </div>
                <div className={style.formActions}>
                    <button disabled={!isFormValid()}>Send</button>
                </div>
            </form>
            <p className={style.requiredText}>* required fields.</p>
        </div>
    );
}

export default Contact;