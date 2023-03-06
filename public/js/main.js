const btn = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-menu');
btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
})

const form = document.querySelector('#movieForm');
const inputField = document.querySelector('input[name="movieTitle"]');
form.addEventListener('submit', (event) => {
  if (inputField.value === '') {
    event.preventDefault();
    alert('Please enter a movie title');
  }
});