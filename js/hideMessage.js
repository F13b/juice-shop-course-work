setTimeout(() => {
    const message = document.querySelector('.message-container');
    
    message.classList.toggle('visualHide');

    setTimeout(() => {
        message.classList.toggle('phisicHide')
    },200);

}, 3000);