// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Movie data (reusing from script.js)
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

// Additional movie details
const movieDetails = {
    1: {
        releaseYear: "2024",
        rating: "PG-13",
        duration: "166 min",
        cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
        genres: ["Science Fiction", "Adventure", "Drama"],
        director: "Denis Villeneuve",
        reviews: [
            { author: "MovieCritic123", text: "A visually stunning and epic continuation of the Dune saga." },
            { author: "SciFiFan", text: "Incredible performances and breathtaking visuals make this a must-watch." }
        ]
    },
    2: {
        releaseYear: "2024",
        rating: "PG-13",
        duration: "116 min",
        cast: ["Dakota Johnson", "Sydney Sweeney", "Isabela Merced"],
        genres: ["Action", "Adventure", "Superhero"],
        director: "S.J. Clarkson",
        reviews: [
            { author: "MarvelFan", text: "An interesting take on the Spider-Verse character." },
            { author: "ComicBookGuru", text: "Dakota Johnson brings a fresh perspective to the role." }
        ]
    }
    // ... Continue with all 30 movies
};

// Initialize My List in localStorage if it doesn't exist
if (!localStorage.getItem('myList')) {
    localStorage.setItem('myList', JSON.stringify([]));
}

// DOM Elements
const backdropImage = document.querySelector('.backdrop-image');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.querySelector('.movie-title');
const releaseYear = document.querySelector('.release-year');
const rating = document.querySelector('.rating');
const duration = document.querySelector('.duration');
const movieDescription = document.querySelector('.movie-description');
const castList = document.querySelector('.cast-list');
const genreList = document.querySelector('.genre-list');
const directorName = document.querySelector('.director-name');
const reviewsContainer = document.querySelector('.reviews-container');
const similarPosters = document.querySelector('.similar-posters');
const addListButton = document.querySelector('.add-list-button');
const playButton = document.querySelector('.play-button');

// Add to My List functionality
function updateAddListButton() {
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    const isInList = myList.includes(Number(movieId));
    addListButton.innerHTML = isInList ? 
        '<i class="fas fa-check"></i> Added to List' :
        '<i class="fas fa-plus"></i> Add to My List';
    addListButton.classList.toggle('in-list', isInList);
}

addListButton.addEventListener('click', () => {
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');
    const movieIdNum = Number(movieId);
    
    if (myList.includes(movieIdNum)) {
        // Remove from list
        const newList = myList.filter(id => id !== movieIdNum);
        localStorage.setItem('myList', JSON.stringify(newList));
    } else {
        // Add to list
        myList.push(movieIdNum);
        localStorage.setItem('myList', JSON.stringify(myList));
    }
    
    updateAddListButton();
});

// Load movie details
function loadMovieDetails() {
    if (movieId && movieData[movieId]) {
        const movie = movieData[movieId];
        const details = movieDetails[movieId] || {
            releaseYear: "2024",
            rating: "PG-13",
            duration: "120 min",
            cast: ["Cast information not available"],
            genres: ["Genre information not available"],
            director: "Director information not available",
            reviews: [
                { author: "Reviewer", text: "No reviews available yet." }
            ]
        };

        // Set page title
        document.title = `${movie.title} - Netflix Clone`;

        // Set backdrop and poster images
        backdropImage.style.backgroundImage = `url(images/thumbnails/${getCategoryFromId(movieId)}/movie${movieId}.jpg)`;
        moviePoster.src = `images/thumbnails/${getCategoryFromId(movieId)}/movie${movieId}.jpg`;
        moviePoster.alt = movie.title;

        // Set movie info
        movieTitle.textContent = movie.title;
        releaseYear.textContent = details.releaseYear;
        rating.textContent = details.rating;
        duration.textContent = details.duration;
        movieDescription.textContent = movie.description;

        // Set cast
        castList.textContent = details.cast.join(", ");

        // Set genres
        genreList.textContent = details.genres.join(", ");

        // Set director
        directorName.textContent = details.director;

        // Load reviews
        loadReviews(details.reviews);

        // Load similar movies
        loadSimilarMovies();

        // Update Add to List button
        updateAddListButton();
    } else {
        // Redirect to home if movie not found
        window.location.href = 'index.html';
    }
}

// Helper function to get category from movie ID
function getCategoryFromId(id) {
    const categories = {
        '1-5': 'trending',
        '6-10': 'originals',
        '11-15': 'action',
        '16-20': 'comedy',
        '21-25': 'horror',
        '26-30': 'drama'
    };

    for (const [range, category] of Object.entries(categories)) {
        const [start, end] = range.split('-').map(Number);
        if (id >= start && id <= end) {
            return category;
        }
    }
    return 'trending';
}

// Load reviews
function loadReviews(reviews) {
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review">
            <div class="review-author">${review.author}</div>
            <div class="review-text">${review.text}</div>
        </div>
    `).join('');
}

// Load similar movies
function loadSimilarMovies() {
    const category = getCategoryFromId(movieId);
    const similarIds = Object.keys(movieData)
        .filter(id => getCategoryFromId(id) === category && id !== movieId)
        .slice(0, 4);

    similarPosters.innerHTML = similarIds.map(id => `
        <img src="images/thumbnails/${category}/movie${id}.jpg"
             alt="${movieData[id].title}"
             onclick="window.location.href='movie-details.html?id=${id}'"
             class="row-poster">
    `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMovieDetails);

// Add play button functionality
playButton.addEventListener('click', () => {
    if (movieId) {
        window.location.href = `video-player.html?id=${movieId}`;
    }
});

// Navigation menu functionality
document.getElementById('tv-shows').addEventListener('click', () => {
    window.location.href = 'index.html?category=tv';
});

document.getElementById('movies').addEventListener('click', () => {
    window.location.href = 'index.html?category=movies';
});

document.getElementById('new-popular').addEventListener('click', () => {
    window.location.href = 'index.html?category=new';
});

document.getElementById('my-list').addEventListener('click', () => {
    window.location.href = 'index.html?category=mylist';
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchBox = document.querySelector('.search-box');
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
        const results = Object.entries(movieData)
            .filter(([_, movie]) => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm)
            );
        
        if (results.length > 0) {
            const firstResult = results[0][0]; // Get first matching movie ID
            window.location.href = `movie-details.html?id=${firstResult}`;
        }
    }
}); 