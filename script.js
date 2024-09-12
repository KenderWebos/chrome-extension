const searchBar = document.getElementById('search-bar');
const btnYouTube = document.getElementById('youtube-search');
const btnTikTok = document.getElementById('tiktok-search');

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

// Evento keydown en el searchBar
searchBar.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (event.key === 'Enter') {
        performSearch("https://www.youtube.com/results?search_query=");
    } 
    // else if (key === 'y') {
    //     performSearch("https://www.youtube.com/results?search_query=");
    // } else if (key === 't') {
    //     performSearch("https://www.tiktok.com/search?q=");
    // }
});
