const validationEmail =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/u

function validationRoleType(role) {
    switch (role) {
        case 'regular':
            return true
        case 'whosale':
            return true
        default:
            return false
    }
}

function validationEmailFn(email) {
    return validationEmail.test(email)
}

function getFieldLength(field, length) {
    if (typeof field !== 'string') {
        return false;
    }
    return field.length >= length;
}

module.exports = {validationRoleType, validationEmail, validationEmailFn, getFieldLength}