const hasToken = (request) => {
    const token = request.cookies.token;

    if (token) {
        return true;
    } else {
        return false;
    }
}

module.exports = hasToken;