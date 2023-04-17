import { 
    EMAIL_REGEX, 
    PASSWORD_REGEX, 
    PHONE_REGEX, 
    PICODE_REGEX
} from "./constants";

export const validateEmail = (email) => {
    return EMAIL_REGEX.test(String(email).toLowerCase());
}

export const validatePhone = (phone) => {
    return PHONE_REGEX.test(phone);
}

export const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
}

export const validatePincode = (pincode) => {
    return PICODE_REGEX.test(pincode);
}