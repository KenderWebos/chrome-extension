const searchBar = document.getElementById('search-bar');
const btn_youtube = document.getElementById('youtube-search');
const btn_tiktok = document.getElementById('tiktok-search');

btn_youtube.addEventListener('click', () => {
    const query = searchBar.value;
    window.open("https://www.youtube.com/results?search_query="+query, '_blank');
});

btn_tiktok.addEventListener('click', () => {
    const query = searchBar.value;
    window.open("https://www.tiktok.com/search?q="+query, '_blank');
});
