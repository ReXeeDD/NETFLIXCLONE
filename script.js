// API Configuration
const API_KEY = 'YOUR_TMDB_API_KEY'; // You'll need to sign up at themoviedb.org to get an API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// DOM Elements
const header = document.querySelector('.header');
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const rowsContainer = document.querySelectorAll('.row-posters');
const banner = document.querySelector('.banner');
const bannerTitle = document.querySelector('.banner-title');
const bannerDesc = document.querySelector('.banner-description');

// DOM Elements for Movie Overview
const overlay = document.querySelector('.overlay');
const movieOverview = document.querySelector('.movie-overview');
const closeOverviewBtn = document.querySelector('.close-overview');

// Movie data
const movieData = {
    1: { title: "Dune: Part Two", description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family." },
    2: { title: "Madame Web", description: "Cassandra Webb develops the power to see the future. Forced to confront revelations about her past, she forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present." },
    3: { title: "Anyone But You", description: "After an amazing first date, Bea and Ben's fiery attraction turns ice cold - until they find themselves unexpectedly reunited at a destination wedding in Australia." },
    4: { title: "Argylle", description: "When the plots of reclusive author Elly Conway's fictional espionage novels begin to mirror the covert actions of a real-life spy organization, quiet evenings at home become a thing of the past." },
    5: { title: "Migration", description: "A family of ducks tries to convince their overprotective father to go on the vacation of a lifetime." },
    6: { title: "Stranger Things", description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl." },
    7: { title: "The Witcher", description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts." },
    8: { title: "Wednesday", description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy." },
    9: { title: "Bridgerton", description: "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society." },
    10: { title: "The Crown", description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century." },
    11: { title: "Mission: Impossible - Dead Reckoning", description: "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands." },
    12: { title: "The Beekeeper", description: "One man's brutal campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization." },
    13: { title: "Rebel Moon", description: "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch a young woman to seek out warriors from neighboring planets to help them take a stand." },
    14: { title: "The Equalizer 3", description: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia." },
    15: { title: "The Creator", description: "Amid a future war between the human race and the forces of artificial intelligence, a hardened ex-special forces agent loses his wife and is recruited to hunt down and kill the Creator." },
    16: { title: "Poor Things", description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter." },
    17: { title: "Barbie", description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans." },
    18: { title: "Mean Girls", description: "New student Cady Heron is welcomed into the top of the social hierarchy by the elite group of popular girls called The Plastics, ruled by the conniving queen bee Regina George and her minions Gretchen and Karen." },
    19: { title: "Wonka", description: "The story of how the world's greatest inventor, magician and chocolate-maker became the beloved Willy Wonka we know today." },
    20: { title: "The Family Plan", description: "Dan Morgan is living a simple suburban life with his family that takes an unexpected turn when his past as an elite government assassin catches up with him." },
    21: { title: "Night Swim", description: "A family's backyard swimming pool holds a supernatural secret that puts them in grave danger." },
    22: { title: "Insidious: The Red Door", description: "To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before." },
    23: { title: "Talk to Me", description: "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces." },
    24: { title: "M3GAN", description: "A brilliant roboticist at a toy company uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results." },
    25: { title: "Evil Dead Rise", description: "A reunion between two estranged sisters gets cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable." },
    26: { title: "Oppenheimer", description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II." },
    27: { title: "The Iron Claw", description: "The true story of the inseparable Von Erich brothers, who made history in the intensely competitive world of professional wrestling in the early 1980s." },
    28: { title: "Killers of the Flower Moon", description: "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, sparking a major F.B.I. investigation involving J. Edgar Hoover." },
    29: { title: "Napoleon", description: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive, volatile relationship with his wife, Josephine." },
    30: { title: "The Color Purple", description: "The story of the extraordinary sisterhood of three women who share one unbreakable bond in the American South at the turn of the twentieth century." }
};

// Event Listeners
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('black-bg');
    } else {
        header.classList.remove('black-bg');
    }
});

searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
});

// API Requests
const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// Fetch and Display Banner
async function fetchBannerMovie() {
    try {
        const response = await fetch(requests.fetchNetflixOriginals);
        const data = await response.json();
        const movies = data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        
        banner.style.backgroundImage = `url(${IMAGE_BASE_URL}${randomMovie.backdrop_path})`;
        bannerTitle.textContent = randomMovie.name || randomMovie.title;
        bannerDesc.textContent = truncate(randomMovie.overview, 150);
    } catch (error) {
        console.error('Error fetching banner:', error);
    }
}

// Fetch and Display Movie Rows
async function fetchMovieRow(url, container) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;

        container.innerHTML = movies.map(movie => `
            <img class="row-poster" 
                 src="${IMAGE_BASE_URL}${movie.poster_path}"
                 alt="${movie.title || movie.name}"
                 loading="lazy"
            />
        `).join('');

        // Add click event for movie selection
        container.querySelectorAll('.row-poster').forEach((poster, index) => {
            poster.addEventListener('click', () => {
                showMovieDetails(index + 1);
            });
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Helper Functions
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Update modal content when a movie is clicked
function showMovieDetails(movieId) {
    const movie = movieData[movieId];
    if (movie) {
        const modal = document.getElementById('movieModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalTitle.textContent = movie.title;
        modalDescription.textContent = movie.description;
        modal.style.display = 'block';
    }
}

// Close modal event listeners
closeOverviewBtn.addEventListener('click', closeMovieOverview);
overlay.addEventListener('click', closeMovieOverview);

function closeMovieOverview() {
    overlay.classList.remove('active');
    movieOverview.classList.remove('active');
    document.body.style.overflow = '';
}

// Create search results container
function createSearchResultsContainer() {
    const mainContent = document.querySelector('.main-content');
    let searchResults = document.getElementById('search-results');
    
    if (!searchResults) {
        searchResults = document.createElement('section');
        searchResults.id = 'search-results';
        searchResults.className = 'row';
        searchResults.innerHTML = `
            <h2 class="row-header">Search Results</h2>
            <div class="row-posters"></div>
        `;
        mainContent.insertBefore(searchResults, mainContent.firstChild);
    }
    return searchResults;
}

// Update search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchResults = createSearchResultsContainer();
    
    if (searchTerm.length > 2) {
        const results = Object.entries(movieData)
            .filter(([_, movie]) => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm)
            );
        
        // Hide all other rows
        document.querySelectorAll('.row:not(#search-results)').forEach(row => {
            row.style.display = 'none';
        });

        // Show and update search results
        searchResults.style.display = 'block';
        const postersContainer = searchResults.querySelector('.row-posters');
        
        if (results.length > 0) {
            postersContainer.innerHTML = results.map(([id, movie]) => `
                <div class="movie-item">
                    <img class="row-poster" 
                         src="images/thumbnails/${getCategoryFromId(id)}/movie${id}.jpg"
                         alt="${movie.title}"
                         data-id="${id}"
                         onclick="window.location.href='movie-details.html?id=${id}'"
                    />
                    <div class="movie-title">${movie.title}</div>
                </div>
            `).join('');
        } else {
            postersContainer.innerHTML = '<p class="no-results">No movies found matching your search.</p>';
        }
    } else {
        // Hide search results and show all rows if search term is too short
        searchResults.style.display = 'none';
        document.querySelectorAll('.row:not(#search-results)').forEach(row => {
            row.style.display = 'block';
        });
    }
});

// Update My List click handler
document.getElementById('my-list').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '?category=mylist';
});

// Add home button functionality
document.querySelector('.nav-brand').addEventListener('click', (e) => {
    e.preventDefault();
    // Clear any category parameters and reload all content
    window.location.href = window.location.pathname;
});

// Add profile menu functionality
document.querySelector('.profile-icon').addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// Add play button functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.play-button')) {
        e.preventDefault();
        const movieElement = e.target.closest('[data-id]');
        if (movieElement) {
            const movieId = movieElement.dataset.id;
            window.location.href = `video-player.html?id=${movieId}`;
        }
    }
});

// Update filterMoviesByCategory function
function filterMoviesByCategory(category) {
    const rows = document.querySelectorAll('.row');
    
    // First, remove any existing My List row if switching categories
    const existingMyListRow = document.querySelector('.my-list-row');
    if (existingMyListRow) {
        existingMyListRow.remove();
    }

    // Remove any search results when switching categories
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.remove();
    }
    
    // Clear search input when switching categories
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    switch(category) {
        case 'mylist':
            rows.forEach(row => row.style.display = 'none');
            loadMyList();
            break;
        case 'tv':
            const mainContent = document.querySelector('.main-content');
            // Clear existing content
            rows.forEach(row => row.style.display = 'none');
            
            // Create TV Shows section
            const tvShowsRow = document.createElement('section');
            tvShowsRow.className = 'row';
            tvShowsRow.innerHTML = `
                <h2 class="row-header">TV Shows</h2>
                <div class="row-posters"></div>
            `;
            
            const postersContainer = tvShowsRow.querySelector('.row-posters');
            // TV Shows are IDs 6-10
            const tvShows = Array.from({length: 5}, (_, i) => i + 6)
                .map(id => {
                    const show = movieData[id];
                    return `
                        <div class="movie-item">
                            <img class="row-poster" 
                                src="images/thumbnails/tv/movie${id}.jpg"
                                alt="${show.title}"
                                data-id="${id}"
                                onerror="this.onerror=null; this.src='images/placeholder.jpg';"
                                onclick="window.location.href='movie-details.html?id=${id}'"
                            />
                            <div class="movie-title">${show.title}</div>
                        </div>
                    `;
                }).join('');
            
            postersContainer.innerHTML = tvShows;
            mainContent.insertBefore(tvShowsRow, mainContent.firstChild);
            break;
        case 'movies':
            rows.forEach(row => {
                const isOriginals = row.querySelector('.row-header')?.textContent.includes('Netflix Originals');
                row.style.display = isOriginals ? 'none' : 'block';
            });
            break;
        case 'new':
            rows.forEach(row => {
                const isTrending = row.querySelector('.row-header')?.textContent.includes('Trending');
                row.style.display = isTrending ? 'block' : 'none';
            });
            break;
        default:
            rows.forEach(row => row.style.display = 'block');
            break;
    }
}

// Update loadMyList function
function loadMyList() {
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    const mainContent = document.querySelector('.main-content');
    
    // Remove any existing My List row
    const existingMyListRow = document.querySelector('.my-list-row');
    if (existingMyListRow) {
        existingMyListRow.remove();
    }
    
    if (myList.length > 0) {
        // Create new My List row
        const myListRow = document.createElement('section');
        myListRow.className = 'row my-list-row';
        myListRow.innerHTML = `
            <h2 class="row-header">My List</h2>
            <div class="row-posters"></div>
        `;
        
        const postersContainer = myListRow.querySelector('.row-posters');
        postersContainer.innerHTML = myList.map(id => {
            const movie = movieData[id];
            if (!movie) return ''; // Skip if movie doesn't exist
            
            // Get the correct category for the image path
            const category = getCategoryFromId(id);
            
            return `
                <div class="movie-item">
                    <img class="row-poster" 
                         src="images/thumbnails/${category}/movie${id}.jpg"
                         alt="${movie.title}"
                         data-id="${id}"
                         onerror="this.onerror=null; this.src='images/placeholder.jpg';"
                         onclick="window.location.href='movie-details.html?id=${id}'"
                    />
                    <div class="movie-title">${movie.title}</div>
                </div>
            `;
        }).join('');
        
        mainContent.insertBefore(myListRow, mainContent.firstChild);
    } else {
        mainContent.innerHTML = `
            <div class="empty-list">
                <h2>Your list is empty</h2>
                <p>Add movies and shows to your list to watch them later.</p>
            </div>
        `;
    }
}

// Helper function to get category from movie ID
function getCategoryFromId(id) {
    // Convert id to number if it's a string
    id = Number(id);
    
    // TV Shows are in the tv category (IDs 6-10)
    if (id >= 6 && id <= 10) {
        return 'tv';
    }
    
    if (id >= 1 && id <= 5) return 'trending';
    if (id >= 11 && id <= 15) return 'action';
    if (id >= 16 && id <= 20) return 'comedy';
    if (id >= 21 && id <= 25) return 'horror';
    if (id >= 26 && id <= 30) return 'drama';
    
    return 'trending'; // Default category
}

// Add click handlers for movie posters
function addMovieClickHandlers() {
    document.querySelectorAll('.row-poster').forEach(poster => {
        poster.addEventListener('click', () => {
            const movieId = poster.dataset.id;
            window.location.href = `movie-details.html?id=${movieId}`;
        });
    });
}

// Add category navigation handlers
document.getElementById('tv-shows').addEventListener('click', (e) => {
    e.preventDefault();
    filterMoviesByCategory('tv');
    history.pushState(null, '', '?category=tv');
});

document.getElementById('movies').addEventListener('click', (e) => {
    e.preventDefault();
    filterMoviesByCategory('movies');
    history.pushState(null, '', '?category=movies');
});

document.getElementById('new-popular').addEventListener('click', (e) => {
    e.preventDefault();
    filterMoviesByCategory('new');
    history.pushState(null, '', '?category=new');
});

// Add home link functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add click handler for Netflix logo/home link
    const homeLink = document.querySelector('.nav-brand');
    if (homeLink) {
        homeLink.style.cursor = 'pointer';
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = window.location.pathname;
        });
    }

    // Add click handler for "Home" link in navigation
    const homeNavLink = document.querySelector('.nav-list a[href="#"]');
    if (homeNavLink) {
        homeNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = window.location.pathname;
        });
    }

    fetchBannerMovie();
    addMovieClickHandlers();
    
    // Check for category in URL and apply filtering
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterMoviesByCategory(category);
    } else {
        // If no category, ensure all content is visible
        filterMoviesByCategory('home');
    }
}); 