window.onload = function() {
  const generateButton = document.getElementById('generateButton');
  generateButton.onclick = generateCountdownLink;

  const nightModeButton = document.getElementById('nightModeButton');
  nightModeButton.onclick = toggleNightMode;

  // Sayfa yüklendiğinde, önceki geri sayım bilgilerini kontrol et ve varsa geri yükle
  const urlParams = new URLSearchParams(window.location.search);
  const countdownDateParam = urlParams.get('date');
  const messageParam = urlParams.get('message');

  if (countdownDateParam && messageParam) {
    document.getElementById('countdownDate').value = new Date(parseInt(countdownDateParam)).toISOString().slice(0, 16);
    document.getElementById('messageInput').value = decodeURIComponent(messageParam);
  }
}

function generateCountdownLink() {
  const countdownDate = new Date(document.getElementById('countdownDate').value).getTime();
  const message = document.getElementById('messageInput').value;
  const encodedMessage = encodeURIComponent(message);

  const baseURL = window.location.href.replace('index.html', ''); // Ana sayfanın URL'sini al

  const link = `${baseURL}?date=${countdownDate}&message=${encodedMessage}`; // Geri sayım için link

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
