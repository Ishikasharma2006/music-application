// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            particlesArray.push(new Particle());
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Song {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
        this.next = null;
        this.prev = null;
    }
}

class Playlist {
    constructor() {
        this.head = null;
        this.current = null;
        this.size = 0;
        this.isPlaying = false;
    }

    addSong(title, artist) {
        const newSong = new Song(title, artist);
        if (!this.head) {
            this.head = newSong;
            this.current = this.head;
        } else {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newSong;
            newSong.prev = temp;
        }
        this.size++;
        this.updatePlaylistUI();
    }

    playSong(song) {
        this.current = song;
        this.isPlaying = true;
        this.updateCurrentSongUI();
        this.updatePlaylistUI();
        document.getElementById('play-pause-icon').src = "https://img.icons8.com/ios-filled/50/ffffff/pause.png";
        document.getElementById('waveform').style.display = 'flex';
    }

    togglePlayPause() {
        if (this.current) {
            this.isPlaying = !this.isPlaying;
            const playPauseIcon = document.getElementById('play-pause-icon');
            const waveform = document.getElementById('waveform');
            playPauseIcon.src = this.isPlaying
                ? "https://img.icons8.com/ios-filled/50/ffffff/pause.png"
                : "https://img.icons8.com/ios-filled/50/ffffff/play.png";
            waveform.style.display = this.isPlaying ? 'flex' : 'none';
            this.updateCurrentSongUI();
        } else {
            alert("No song selected!");
        }
    }

    nextSong() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            this.isPlaying = true;
            this.updateCurrentSongUI();
            this.updatePlaylistUI();
            document.getElementById('play-pause-icon').src = "https://img.icons8.com/ios-filled/50/ffffff/pause.png";
            document.getElementById('waveform').style.display = 'flex';
        } else {
            alert("No next song available. End of playlist.");
        }
    }

    previousSong() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            this.isPlaying = true;
            this.updateCurrentSongUI();
            this.updatePlaylistUI();
            document.getElementById('play-pause-icon').src = "https://img.icons8.com/ios-filled/50/ffffff/pause.png";
            document.getElementById('waveform').style.display = 'flex';
        } else {
            alert("No previous song available. Start of playlist.");
        }
    }

    updateCurrentSongUI() {
        const titleElement = document.getElementById('current-title');
        const artistElement = document.getElementById('current-artist');
        const waveform = document.getElementById('waveform');
        if (this.current) {
            titleElement.textContent = this.current.title;
            artistElement.textContent = this.current.artist;
            waveform.style.display = this.isPlaying ? 'flex' : 'none';
        } else {
            titleElement.textContent = "No Song Playing";
            artistElement.textContent = "";
            waveform.style.display = 'none';
        }
    }

    updatePlaylistUI() {
        const playlistElement = document.getElementById('playlist');
        playlistElement.innerHTML = '';
        let temp = this.head;
        let index = 1;
        while (temp) {
            const songItem = document.createElement('div');
            songItem.className = `song-item flex justify-between items-center p-4 rounded-lg ${temp === this.current && this.isPlaying ? 'current' : ''}`;
            songItem.innerHTML = `
                <span class="song-number w-8 text-right">${index}</span>
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-white">${temp.title}</h3>
                    <p class="text-sm text-pink-400">${temp.artist}</p>
                </div>
            `;
            songItem.onclick = () => this.playSong(temp);
            playlistElement.appendChild(songItem);
            temp = temp.next;
            index++;
        }
    }
}

// Initialize playlist
const playlist = new Playlist();

// Add sample songs
playlist.addSong("Shape of You", "Ed Sheeran");
playlist.addSong("Bohemian Rhapsody", "Queen");
playlist.addSong("Billie Jean", "Michael Jackson");
playlist.addSong("Hey Jude", "The Beatles");

// Event handlers
function playNext() {
    playlist.nextSong();
}

function playPrevious() {
    playlist.previousSong();
}

function togglePlayPause() {
    playlist.togglePlayPause();
}

// Initial UI update
playlist.updateCurrentSongUI();
playlist.updatePlaylistUI();