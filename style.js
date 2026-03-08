const subscribeBtn = document.getElementById('subscribe-btn');
const emailInput = document.getElementById('email');
const statusMessage = document.querySelector('.status-message');
const machineFooter = document.querySelector('.machine-footer');

subscribeBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (!email) {
    showMessage('⛔️ Please enter a valid email address!', 'error');
    shakeInput();
    return;
  }

  showMessage('⏳ Calculating time coordinates...', 'loading');
  startLoadingBar();

  setTimeout(() => {
    if (validateEmail(email)) {
      showMessage('✅ Coordinates verified! Welcome to the future.', 'success');
      displaySuccessMessage();
    } else {
      showMessage('⛔️ Invalid email address! Check your input.', 'error');
      shakeInput();
    }
  }, 3000);
});

function showMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.style.color = type === 'error' ? '#ff4d4d' : type === 'success' ? '#00ff99' : '#ffc107';
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function shakeInput() {
  emailInput.style.animation = 'shake 0.3s';
  setTimeout(() => {
    emailInput.style.animation = '';
  }, 300);
}

function startLoadingBar() {
  const loadingBar = document.querySelector('.loading-bar::after');
  loadingBar.style.animation = 'loading 2s infinite';
}

function displaySuccessMessage() {
  const machineBody = document.querySelector('.machine-body');
  machineBody.innerHTML = `
    <h2>🎉 Welcome to the Future!</h2>
    <p>You'll receive exclusive insights soon. Stay tuned!</p>
  `;
}
