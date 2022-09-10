// Import the functions you need from the SDKs you need

const btnMegusta = document.querySelector('#btnMegusta');
const contadorLikes = document.querySelector('#contadorLikes');

btnMegusta.addEventListener('click', () => {
    let actual = contadorLikes.innerHTML;
    contadorLikes.innerHTML = parseInt(actual) + 1;
});


