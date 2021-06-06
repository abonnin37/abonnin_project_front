import React from "react";

import style from "./input.module.scss";
import clsx from "clsx";

function InputField(props) {
    const {
        label,
        type,
        name,
        handleChange,
        handleBlur,
        errorMessage,
        isValid,
        isTouched,
        value,
        isRequired,
        formId
    } = props;

    const classes = clsx({
        [style.inputContainer]: true,
        "inputContainer": true,
    });

    return (
        <div className={classes}>
            {
                type === "textarea" ?
                    <textarea form={formId} name={name} value={value} onChange={handleChange} onBlur={handleBlur} placeholder={`${label}${isRequired ? '*' : ''}`}/>
                    :
                    <input type={type} name={name} value={value} onChange={handleChange} onBlur={handleBlur} placeholder={`${label}${isRequired ? '*' : ''}`}/>
            }
            {errorMessage && (!isValid  || isTouched) && (
                <span className={style.error}>{errorMessage}</span>
            )}
        </div>
    );
}

export default React.memo(InputField);