function isDigit(digit: string) : boolean {
    return digit.charAt(0) >= '0' && digit.charAt(0) <= '9';
}

export const validatePhoneNumber = (phone: string) : boolean => {
    return phone.length >= 3 && phone.length <= 15 && phone.split('').filter((e) => !isDigit(e)).length == 1;
}

export const validatePassword = (password: string) : boolean => {
    return password.length >= 6 && password.length <= 128;
}

export const validateName = (name: string) : boolean => {
    return name.length > 2 && name.length < 128;
}

export const validateTemplateName = (name: string) : boolean => {
    return name.length > 5 && name.length < 128;
} 

export const validateTemplateContent = (content: string) : boolean => {
    return content.length > 3 && content.length < 128;
}