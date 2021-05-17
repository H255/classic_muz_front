const hamburgerBtn = document.getElementById('hamburgerBtn');
console.log(hamburgerBtn, 'hamburgerBtn');

const sidebar = document.getElementById('sidebar');
console.log(sidebar,'sidebar');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    hamburgerBtn.classList.toggle('close');
});

function exit(){
    localStorage.removeItem('token');
    window.location.href = "/index.html";
}