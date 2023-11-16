function generateCountdownLink() {
    const countdownDate = new Date(document.getElementById('countdownDate').value).getTime();
    const message = document.getElementById('messageInput').value;
  
    const link = `preview.html?date=${countdownDate}`;
    
    document.getElementById('generatedLink').innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
  }
  