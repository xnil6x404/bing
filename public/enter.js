function checkCode() {
  const codeInput = document.getElementById('codeInput');
  const code = codeInput.value.trim();

  if (code === '14133505') {
    showPopup();
    setTimeout(() => {
      window.location.href = 'start.html';
    }, 2000);
  } else {
    alert('Invalid code. Please try again.');
  }
}

function showPopup() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');
  const loadingAnimation = document.createElement('div');
  loadingAnimation.classList.add('loading-animation');
  popup.innerHTML = '<h2>Starting...</h2>';
  popup.appendChild(loadingAnimation);
  overlay.style.display = 'block';
}
function GetCode() {
      // Replace 'YOUR_FACEBOOK_PROFILE_LINK' with the actual link to your Facebook profile
      window.location.href = 'https://www.facebook.com/profile.php?id=100065445284007&mibextid=9R9pXO';
    }
    const textElement = document.getElementById("text");
const text = textElement.innerText;
textElement.innerText = "";

let i = 0;
function typeText() {
  if (i < text.length) {
    textElement.innerText += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

setTimeout(typeText, 1000);