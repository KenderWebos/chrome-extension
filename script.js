const searchBar = document.getElementById('search-bar');
const btnYouTube = document.getElementById('youtube-search');
const btnTikTok = document.getElementById('tiktok-search');
const btnGoogle = document.getElementById('google-search');
const btnXCom = document.getElementById('xcom-search');
const btnReddit = document.getElementById('reddit-search');
const btnChatGPT = document.getElementById('chatgpt-search');

// Función para abrir la búsqueda en una plataforma específica
function performSearch(baseURL) {
    const query = searchBar.value.trim();
    if (query) {
        window.open(baseURL + encodeURIComponent(query), '_blank');
    } else {
        alert('Por favor, ingresa una búsqueda.');
    }
}

// Eventos click en los botones
btnYouTube.addEventListener('click', () => performSearch("https://www.youtube.com/results?search_query="));
btnTikTok.addEventListener('click', () => performSearch("https://www.tiktok.com/search?q="));
btnGoogle.addEventListener('click', () => performSearch("https://www.google.com/search?q="));
btnXCom.addEventListener('click', () => performSearch("https://x.com/search?q="));
btnReddit.addEventListener('click', () => performSearch("https://www.reddit.com/r/all/search?q="));
btnChatGPT.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        // Abre ChatGPT (OpenAI) con la consulta como una búsqueda
        window.open(`https://chat.openai.com/chat?query=${encodeURIComponent(query)}`, '_blank');
    } else {
        alert('Por favor, ingresa una consulta para ChatGPT.');
    }
});

// Evento keydown en el searchBar
// searchBar.addEventListener('keydown', (event) => {
//     const key = event.key.toLowerCase();
//     if (event.key === 'Enter') {
//         performSearch("https://www.youtube.com/results?search_query=");
//     } 
//     else if (key === '1') {
//         performSearch("https://www.youtube.com/results?search_query=");
//     } else if (key === '2') {
//         performSearch("https://www.tiktok.com/search?q=");
//     } else if (key === '3') {
//         performSearch("https://www.google.com/search?q=");
//     } else if (key === '4') {
//         performSearch("https://x.com/search?q=");
//     } else if (key === '5') {
//         performSearch("https://www.reddit.com/search/?q=");
//     } else if (key === '6') {
//         // Abre ChatGPT
//         const query = searchBar.value.trim();
//         if (query) {
//             window.open(`https://chat.openai.com/chat?query=${encodeURIComponent(query)}`, '_blank');
//         } else {
//             alert('Por favor, ingresa una consulta para ChatGPT.');
//         }
//     }
// });