const root = document.documentElement;
const eye1 = document.getElementById('eyeball1');
const eye2 = document.getElementById('eyeball2');
const beam1 = document.getElementById('beam1');
const beam2 = document.getElementById('beam2');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

root.addEventListener('mousemove', (e) => {
  let rect = beam1.getBoundingClientRect();
  let mouseX = rect.right + (rect.width / 2); 
  let mouseY = rect.top + (rect.height / 2);
  let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
  let degrees = (rad * (20 / Math.PI) * -1) - 350;

  root.style.setProperty('--beamDegrees', `${degrees}deg`);
});

// Toggle visibility password
eye1.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('show-password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.focus();
});

// Toggle visibility confirm password
eye2.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('show-password');
  confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
  confirmPasswordInput.focus();
});
