document.getElementById('translate-button').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;
    const inputLanguage = document.getElementById('input-language').value;
    const outputLanguage = document.getElementById('output-language').value;

    // Placeholder for API call
    fetch(`https://api.example.com/translate?text=${inputText}&from=${inputLanguage}&to=${outputLanguage}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('output-text').innerText = data.translation;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
