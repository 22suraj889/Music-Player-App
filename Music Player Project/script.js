const play = document.getElementById("play");
const music = document.querySelector("audio");
const music_image = document.querySelector("img");
const song_title = document.getElementById("song_title");
const singer_name = document.getElementById("singer_name");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let playing = false;

//playing music
function play_music() {
    music.play();
    playing = true;
    music_image.classList.add("rotate_music_image");
    play.classList.replace("fa-play", "fa-pause");
    play.setAttribute("title", "Pause");
}

//pausing music
function pause_music() {
    music.pause();
    playing = false;
    music_image.classList.remove("rotate_music_image");
    play.classList.replace("fa-pause", "fa-play");
    play.setAttribute("title", "Play");
}
play.addEventListener("click", () => {
    playing ? pause_music() : play_music();
})

//array of songs details
const songs = [{
        name: "music-1",
        title: "Aadat",
        artist: "Atif Aslam",
    },
    {
        name: "music-2",
        title: "Tum Prem Ho",
        artist: "Mohit Lalwani",
    },
    {
        name: "music-3",
        title: "Woh Lamhe",
        artist: "Atif Aslam",

    },
    {
        name: "music-4",
        title: "Bevafa",
        artist: "Jubin Nautiyal",

    },
    {
        name: "music-5",
        title: "Attention",
        artist: "Charlie Puth",

    },
];

// load next or previous songs as user click forward or backward button
function load_songs(songs) {
    music.src = `music/${songs.name}.mp3`;
    song_title.innerHTML = songs.title;
    singer_name.innerHTML = songs.artist;
    music_image.src = `images/${songs.name}.jpg`;
}

//loading next song when forward button is clicked or current song get finished or when right arrow key is pressed
let current_song = 0;
next.addEventListener("click", load_next_song);

function load_next_song() {
    ++current_song;
    if (current_song >= songs.length) {
        current_song = 0;
    }
    load_songs(songs[current_song]);
    play_music();
}


//loading previous song when backward button is clicked
prev.addEventListener("click", load_previous_song);

function load_previous_song() {
    --current_song;
    if (current_song < 0) {
        current_song = songs.length - 1;
    }
    load_songs(songs[current_song]);
    play_music();
}

//these are next , previous, play and pause event which can be control by keyboard
document.onkeydown = function(event) {

    if (event.keyCode == 32 && playing) {
        pause_music();
    } else if (event.keyCode == 32 && !playing) {
        play_music();
    } else if (event.keyCode == 39) {
        next.click();
    } else if (event.keyCode == 37) {
        prev.click();
    } else if (event.keyCode == 74) {
        music.currentTime = music.currentTime - 10;
    } else if (event.keyCode == 76) {
        music.currentTime = music.currentTime + 10;
    }
};

//playing next song when previous song in finished playing
music.addEventListener('ended', () => {
    load_next_song();
})

//progress bar animation with time
const progress = document.querySelector(".progress");
let current_duration = document.querySelector(".current_duration");
let total_duration = document.querySelector(".total_duration");
music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_percentage = ((currentTime / duration) * 100);
    progress.style.width = `${progress_percentage}%`;


    let duration_min_total = Math.floor(duration / 60);
    let duration_sec_total = Math.floor(duration % 60);
    if (duration && duration_sec_total < 10) {
        total_duration.innerHTML = `${duration_min_total}:0${duration_sec_total}`;
    } else if (duration) {
        total_duration.innerHTML = `${duration_min_total}:${duration_sec_total}`;

    }

    let duration_min_current = Math.floor(currentTime / 60);
    let duration_sec_current = Math.floor(currentTime % 60);
    if (duration && duration_sec_current < 10) {
        current_duration.innerHTML = `${duration_min_current}:0${duration_sec_current}`;
    } else if (duration) {
        current_duration.innerHTML = `${duration_min_current}:${duration_sec_current}`;
    }
});

//dark and light mode
const dark_light_icon = document.getElementById("dark_light_icon");
const main_container = document.querySelector(".main_container");
const music_container = document.querySelector(".music_container");
const progress_bar = document.querySelector(".progress_bar");
let is_dark = true;

function enable_light_mode() {
    dark_light_icon.classList.replace("fa-sun", "fa-moon");
    main_container.style.background = "white";
    music_container.style.background = "#111";
    song_title.style.color = "white";
    play.style.background = "white";
    play.style.color = "black";
    next.style.color = "white";
    prev.style.color = "white";
    dark_light_icon.style.background = "white";
    dark_light_icon.style.color = "black";
    music_image.style.boxShadow = " #939191 0px 0.2rem 1.4rem 0.5rem";
    current_duration.style.color = "white";
    total_duration.style.color = "white";
    progress_bar.style.boxShadow = "0px 0px 4px white";
    is_dark = false;
}

function enable_dark_mode() {
    dark_light_icon.classList.replace("fa-moon", "fa-sun");
    main_container.style.background = "#111";
    music_container.style.background = "white";
    song_title.style.color = "black";
    play.style.background = "black";
    play.style.color = "white";
    next.style.color = "black";
    prev.style.color = "black";
    dark_light_icon.style.background = "black";
    dark_light_icon.style.color = "white";
    music_image.style.boxShadow = " black 0px 0.2rem 1.4rem 0.5rem";
    current_duration.style.color = "black";
    total_duration.style.color = "black";
    progress_bar.style.boxShadow = "0px 0px 4px black";
    is_dark = true;
}

dark_light_icon.addEventListener("click", () => {
    is_dark ? enable_light_mode() : enable_dark_mode();
});

//forwarding music when progress bar is clicked
progress_bar.addEventListener("click", (event) => {
    let songs_total_duration = music.duration;
    let music_progress = (event.offsetX / event.srcElement.clientWidth) * songs_total_duration;
    music.currentTime = music_progress;
})