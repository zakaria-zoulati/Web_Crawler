// utilities for validation 


/*
    Url Validation
*/
function isValidURL(str) {
    try {
        const url = new URL(str);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}


/*
    Number Validation
*/
function isNumber(n){
    return Number(n) === n && Number.isFinite(n);
}

module.exports = {
    isValidURL,
    isNumber,
};

