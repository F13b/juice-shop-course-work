document.addEventListener("DOMContentLoaded", () => {
    const token = document.querySelector('.logo-activities');
    localStorage.setItem('token', token.dataset.token);
    token.dataset.token = '';
});