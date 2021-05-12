import React from "react";

import style from "./input.module.scss";

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

    return (
        <div className={style.inputContainer}>
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