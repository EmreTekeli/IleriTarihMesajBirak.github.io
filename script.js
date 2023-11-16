function encodeJWT(payload, key) {
    const header = {
        alg: 'base64url',
        typ: 'JWT'
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const encodedSignature = btoa(key); // Güvenlik zayıf, gerçek uygulamada güvenli bir imza algoritması kullanılmalıdır.

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function previewMessage() {
    const message = document.getElementById('message').value;
    const dateInput = document.getElementById('date');
    const date = new Date(dateInput.value);

    const now = new Date();

    if (date <= now) {
        alert('Lütfen ileri bir tarih seçin.');
        return;
    }

    const secretKey = 's3cr3tK3y';
    const messageData = { message, date: date.toISOString() };
    const token = encodeJWT(messageData, secretKey);

    const previewLink = `${window.location.origin}/preview.html?token=${token}`;

    // Kopyalama işlevi ekle
    const tempInput = document.createElement('input');
    tempInput.value = previewLink;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Mesajınız başarıyla gönderildi! İşte önizleme linki: ' + previewLink + '\nLink kopyalandı.');
}

document.getElementById('messageForm').addEventListener('submit', function (event) {
    event.preventDefault();
    previewMessage();
});

function updateCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');

    const now = new Date();
    const timeDifference = targetDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    countdownElement.textContent = `Geri sayım: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;
}
