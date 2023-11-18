function generateRandomString(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((value) => charset[value % charset.length])
    .join('');
}

function generateCountdownLink() {
  const countdownDate = new Date(document.getElementById('countdownDate').value).getTime();
  const message = document.getElementById('messageInput').value;
  const encodedMessage = encodeURIComponent(message);

  // localStorage kullanarak mesajı sakla
  localStorage.setItem('countdownDate', countdownDate);
  localStorage.setItem('message', encodedMessage);

  const baseURL = 'https://emretekeli.github.io/MesajBirak.github.io/preview.html'; // Sabit URL

  const storedCountdownDate = localStorage.getItem('countdownDate');
  const storedMessage = localStorage.getItem('message');

  const queryParams = new URLSearchParams();
  queryParams.set('unique', generateRandomString(8)); // Benzersiz parametre
  queryParams.set('countdownDate', storedCountdownDate);
  queryParams.set('message', storedMessage);

  const link = `${baseURL}?${queryParams.toString()}`; // URL'yi oluştur

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
