function generateCountdownLink() {
  const countdownDate = new Date(document.getElementById('countdownDate').value).getTime();
  const message = document.getElementById('messageInput').value;
  const encodedMessage = encodeURIComponent(message);

  // localStorage kullanarak mesajı sakla
  localStorage.setItem('countdownDate', countdownDate);
  localStorage.setItem('message', encodedMessage);

  const link = `preview.html`;
  
  document.getElementById('generatedLink').innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
}
