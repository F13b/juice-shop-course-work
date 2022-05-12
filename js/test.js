const btn = document.querySelector('.action-button-reg');

btn.addEventListener('click', async (e) => {    
    await axios.post('/signin', {Name: 'Manager', Password: 'Memegment'})
    .then((res) => {
        console.log(res)
    })
    .catch((error) => console.log(error));
})