console.log('Add task button clicked');

const searchBar = document.getElementById('search-bar');
const btnYouTube = document.getElementById('youtube-search');
const btnTikTok = document.getElementById('tiktok-search');
const btnGoogle = document.getElementById('google-search');
const btnXCom = document.getElementById('xcom-search');
const btnReddit = document.getElementById('reddit-search');
// const btnChatGPT = document.getElementById('chatgpt-search');
const btnGoogleMaps = document.getElementById('google-maps-search');

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
btnGoogleMaps.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        // Abre Google Maps con la consulta
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
    } else {
        alert('Por favor, ingresa una ubicación o dirección para Google Maps.');
    }
});

// Evento keydown en el searchBar
searchBar.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (event.key === 'Enter') {
        performSearch("https://www.youtube.com/results?search_query=");
    }
});