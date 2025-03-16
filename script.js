// Sample data for recently played and recommendations
const recentlyPlayedData = [
    {
        title: 'Liked Songs',
        imageUrl: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
        type: 'Playlist'
    },
    {
        title: 'Daily Mix 1',
        imageUrl: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb6be070445b03e0b63147c2b1/1/en/default',
        type: 'Mix'
    },
    {
        title: 'Discover Weekly',
        imageUrl: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/dHB0cHRwdHB0cHRwdHB0cA==',
        type: 'Playlist'
    },
    {
        title: 'Release Radar',
        imageUrl: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/release-radar/ab6761610000e5eb2e83342b0f36ba888c77be62/en',
        type: 'Playlist'
    }
];

const recommendationsData = [
    {
        title: 'Chill Hits',
        description: 'Kick back to the best new and recent chill hits',
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe'
    },
    {
        title: 'Rock Classics',
        description: 'Rock legends & epic songs that continue to inspire generations',
        imageUrl: 'https://i.scdn.co/image/ab67706f000000027d1067c1154287f30c71f10c'
    },
    {
        title: 'All Out 2010s',
        description: 'The biggest songs of the 2010s',
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1'
    },
    {
        title: 'RapCaviar',
        description: 'New music from Lil Baby, Gucci Mane and Lil Durk',
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002b65d5a8ed2634c3bdd10e3d3'
    }
];

// DOM Elements
const recentlyPlayedContainer = document.querySelector('.recently-played');
const recommendationsContainer = document.querySelector('.recommendations');
const playButton = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeBar = document.querySelector('.volume-bar');
const volumeFilled = document.querySelector('.volume-filled');

// Create recently played items
function createRecentlyPlayedItems() {
    recentlyPlayedContainer.innerHTML = recentlyPlayedData.map(item => `
        <div class="playlist-card">
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.type}</p>
        </div>
    `).join('');
}

// Create recommendation items
function createRecommendationItems() {
    recommendationsContainer.innerHTML = recommendationsData.map(item => `
        <div class="recommendation-card">
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// Toggle play/pause
let isPlaying = false;
playButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
});

// Progress bar functionality
progressBar.addEventListener('click', (e) => {
    const progressWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    const percentage = (clickX / progressWidth) * 100;
    progressFilled.style.width = `${percentage}%`;
});

// Volume bar functionality
volumeBar.addEventListener('click', (e) => {
    const volumeWidth = volumeBar.clientWidth;
    const clickX = e.offsetX;
    const percentage = (clickX / volumeWidth) * 100;
    volumeFilled.style.width = `${percentage}%`;
});

// Initialize the page
function init() {
    createRecentlyPlayedItems();
    createRecommendationItems();

    // Add some CSS for the cards
    const style = document.createElement('style');
    style.textContent = `
        .playlist-card, .recommendation-card {
            background: var(--secondary-background);
            padding: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .playlist-card:hover, .recommendation-card:hover {
            background: #282828;
        }

        .playlist-card img, .recommendation-card img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 16px;
        }

        .playlist-card h3, .recommendation-card h3 {
            font-size: 16px;
            margin-bottom: 8px;
        }

        .playlist-card p, .recommendation-card p {
            font-size: 14px;
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add time update simulation
let currentTime = 0;
const totalTime = 180; // 3 minutes in seconds

function updateTime() {
    if (isPlaying && currentTime < totalTime) {
        currentTime++;
        const percentage = (currentTime / totalTime) * 100;
        progressFilled.style.width = `${percentage}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
        totalTimeEl.textContent = formatTime(totalTime);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize time display
totalTimeEl.textContent = formatTime(totalTime);
currentTimeEl.textContent = formatTime(0); 