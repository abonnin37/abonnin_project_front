import React from "react";
import Input from "/src/components/UI/input/input";

import {
    requiredRule,
    minLengthRule,
    maxLengthRule,
    passwordMatchRule
} from "./inputValidationRules";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show in the placeholder with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {boolean} isRequired - option to tell the use the field is required
 * @param {string} className - additional className
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(label, name, type, isRequired = false, className="", defaultValue = "") {
    return {
        /**
         * Function that render an Input component
         *
         * @param {function} handleChange
         * @param {function} handleBlur
         * @param {string} value
         * @param {boolean} isValid
         * @param {boolean} isTouched
         * @param {string} error
         * @param {string} key
         * @param {string} formId - Id that allow textarea to be link to the form
         * @returns {JSX.Element}
         */
        renderInput: (handleChange, handleBlur, value, isValid, isTouched, error, key, formId) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    isTouched={isTouched}
                    value={value}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errorMessage={error}
                    isRequired={isRequired}
                    formId={formId}
                />
            );
        },
        label,
        value: defaultValue,
        valid: false,
        errorMessage: "",
        touched: false
    };
}

// https://academind.com/tutorials/reactjs-a-custom-useform-hook/
// https://codesandbox.io/s/custom-hook-for-forms-in-react-jy0wl?file=/src/SignupForm.js

// Warning : the  input-field-name have to be the same than the createFormFieldConfig-name
// object representation of contact form
export const contactForm = {
    name: {
        ...createFormFieldConfig("Name", "name", "text", true, ),
        validationRules: [
            requiredRule("name"),
            minLengthRule("name", 3),
            maxLengthRule("name", 25)
        ]
    },
    lastname: {
        ...createFormFieldConfig("Last Name", "lastname", "text", true),
        validationRules: [
            requiredRule("lastname"),
            minLengthRule("lastname", 3),
            maxLengthRule("lastname", 25)
        ]
    },
    email: {
        ...createFormFieldConfig("Email", "email", "email", true),
        validationRules: [
            requiredRule("email"),
            minLengthRule("email", 8),
            maxLengthRule("email", 50)
        ]
    },
    company: {
        ...createFormFieldConfig("Company", "company", "text"),
        validationRules: [
            minLengthRule("email", 8),
            maxLengthRule("email", 50)
        ]
    },
    subject: {
        ...createFormFieldConfig("Subject", "subject", "text", true),
        validationRules: [
            requiredRule("subject"),
            minLengthRule("subject", 5),
            maxLengthRule("subject", 255)
        ]
    },
    message: {
        ...createFormFieldConfig("Message", "message", "textarea", true),
        validationRules: [
            requiredRule("message"),
            minLengthRule("password", 10)
        ]
    }
};
