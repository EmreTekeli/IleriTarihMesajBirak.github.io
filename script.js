// Sayfa yüklendiğinde çalışacak kısım
window.onload = function() {
  const generateButton = document.getElementById('generateButton');
  generateButton.onclick = generateCountdownLink;

  const nightModeButton = document.getElementById('nightModeButton');
  nightModeButton.onclick = toggleNightMode;

  // Önceki geri sayım bilgilerini temizle (her sayfa yüklendiğinde)
  localStorage.removeItem('countdownDate');
  localStorage.removeItem('message');
}

function generateCountdownLink() {
  const countdownDate = new Date(document.getElementById('countdownDate').value).getTime();
  const message = document.getElementById('messageInput').value;
  const encodedMessage = encodeURIComponent(message);

  // localStorage kullanarak mesajı sakla
  localStorage.setItem('countdownDate', countdownDate);
  localStorage.setItem('message', encodedMessage);

  const baseURL = window.location.href.replace('index.html', ''); // Ana sayfanın URL'sini al

  const link = `${baseURL}preview.html?date=${countdownDate}&message=${encodedMessage}`; // Geri sayım için link

  const generatedLink = document.getElementById('generatedLink');
  generatedLink.innerHTML = '';

  const shareButton = document.createElement('button');
  shareButton.textContent = 'Linki Kopyala';
  shareButton.onclick = function() {
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('copyAlert').style.display = 'block';
    setTimeout(function() {
      document.getElementById('copyAlert').style.display = 'none';
    }, 1500);
  };

  generatedLink.appendChild(shareButton);
}
