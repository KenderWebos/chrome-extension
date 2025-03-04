const searchBar = document.getElementById('search-bar');
const btnYouTube = document.getElementById('youtube-search');
const btnTikTok = document.getElementById('tiktok-search');
const btnGoogleMaps = document.getElementById('google-maps-search');

// Plataformas y sus URLs
const platforms = {
    youtube: "https://www.youtube.com/results?search_query=",
    tiktok: "https://www.tiktok.com/search?q=",
    maps: "https://www.google.com/maps/search/"
};

// Función para limpiar la query y detectar plataforma
function parseQuery(query) {
    query = query || "";  // Manejar queries undefined
    let cleanedQuery = query;
    let detectedPlatform = 'youtube';  // Plataforma por defecto

    // Detectar sufijos y limpiar query
    if (query.endsWith(" -y")) {
        detectedPlatform = 'youtube';
        cleanedQuery = query.slice(0, -3);
    } else if (query.endsWith(" -t")) {
        detectedPlatform = 'tiktok';
        cleanedQuery = query.slice(0, -3);
    } else if (query.endsWith(" -m")) {
        detectedPlatform = 'maps';
        cleanedQuery = query.slice(0, -3);
    }

    return {
        platform: detectedPlatform,
        cleanedQuery: cleanedQuery.trim()  // Quitar espacios adicionales
    };
}

// Función para realizar la búsqueda
function performSearch(baseURL, query) {
    if (query) {
        window.open(baseURL + encodeURIComponent(query), '_blank');
    } else {
        alert('Por favor ingresa una búsqueda válida.');
    }
}

// Búsqueda al presionar Enter
function handleSearchOnEnter(event) {
    if (event.key === 'Enter') {
        const query = searchBar.value.trim();
        const { platform, cleanedQuery } = parseQuery(query);
        performSearch(platforms[platform], cleanedQuery);
    }
}

// Búsqueda al hacer clic en botones
function handleButtonClick(selectedPlatform) {
    const query = searchBar.value.trim();
    const { cleanedQuery } = parseQuery(query);  // Limpiar query pero usar la plataforma del botón
    performSearch(platforms[selectedPlatform], cleanedQuery);
}

// Inicializar eventos
function initializeEventListeners() {
    searchBar.addEventListener('keydown', handleSearchOnEnter);
    btnYouTube.addEventListener('click', () => handleButtonClick('youtube'));
    btnTikTok.addEventListener('click', () => handleButtonClick('tiktok'));
    btnGoogleMaps.addEventListener('click', () => handleButtonClick('maps'));
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', initializeEventListeners);