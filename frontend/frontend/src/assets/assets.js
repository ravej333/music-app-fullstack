// --- Icon Imports ---
import bell_icon from "./bell.png";
import home_icon from "./home.png";
import like_icon_empty from "./like_icon_empty.png";
import like_icon_filled from "./like_icon_filled.png";
import loop_icon from "./loop.png";
import mic_icon from "./mic.png";
import next_icon from "./next.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import plays_icon from "./plays.png";
import prev_icon from "./prev.png";
import search_icon from "./search.png";
import shuffle_icon from "./shuffle.png";
import speaker_icon from "./speaker.png";
import stack_icon from "./stack.png";
import zoom_icon from "./zoom.png";
import plus_icon from "./plus.png";
import arrow_icon from "./arrow.png";
import mini_player_icon from "./mini-player.png";
import queue_icon from "./queue.png";
import volume_icon from "./volume.png";
import arrow_right from "./right_arrow.png";
import arrow_left from "./left_arrow.png";
import spotify_logo from "./spotify_logo.png";
import clock_icon from "./clock_icon.png";

// --- Image Imports ---
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img11 from "./img11.jpg";
import img12 from "./img12.jpg";
import img13 from "./img13.jpg";
import img14 from "./img14.jpg";
import img15 from "./img15.jpg";
import img16 from "./img16.jpg";
import img17 from "./img17.jpg";
import img18 from "./img18.jpg";
import img19 from "./img19.jpg";
import img110 from "./img110.jpg";
import img21 from "./img21.jpg";
import img31 from "./img31.jpg";
import img41 from "./img41.jpg";
import img71 from "./img71.jpg";
import img201 from "./img201.jpeg";
import img202 from "./img202.jpg";
import img001 from "./img001.jpg";
import img002 from "./img002.jpg";
import img003 from "./img003.jpg";
import img004 from "./img004.jpg";
import img005 from "./img005.jpg";

// --- Asset Imports for Former Unlisted Songs ---
import unlisted_song_1_audio from "./unlisted_song_1_audio.mp3";
import unlisted_song_1_image from "./unlisted_song_1_image.jpeg";
import unlisted_song_2_audio from "./unlisted_song_2_audio.mp3";
import unlisted_song_2_image from "./unlisted_song_2_image.jpeg";
import unlisted_song_3_audio from "./unlisted_song_3_audio.mp3";
import unlisted_song_3_image from "./unlisted_song_3_image.jpeg";
import unlisted_song_4_audio from "./unlisted_song_4_audio.mp3";
import unlisted_song_4_image from "./unlisted_song_4_image.jpeg";
import unlisted_song_5_audio from "./unlisted_song_5_audio.mp3";
import unlisted_song_5_image from "./unlisted_song_5_image.jpeg";


// --- Regular Song Audio Imports ---
import song1 from "./song1.mp3";
import song2 from "./song2.mp3";
import song3 from "./song3.mp3";
import song4 from "./song4.mp3";
import song5 from "./song5.mp3";
import song6 from "./song6.mp3";
import song12 from "./song12.mp3";
import song13 from "./song13.mp3";
import song14 from "./song14.mp3";
import song15 from "./song15.mp3";
import song16 from "./song16.mp3";
import song17 from "./song17.mp3";
import song18 from "./song18.mp3";
import song19 from "./song19.mp3";
import song110 from "./song110.mp3";
import song201 from "./song201.mp3";
import song202 from "./song202.mp3";

// --- Main Asset Exports ---
export const assets = {
    bell_icon,
    home_icon,
    like_icon_empty,
    like_icon_filled,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    pause_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    queue_icon,
    volume_icon,
    arrow_right,
    arrow_left,
    spotify_logo,
    clock_icon,
};

// --- Data Exports ---
// UPDATED: Banner now links to the newly integrated songs (IDs 17-21)
export const bannerData = [
    { id: 'banner_1', image: img001, songId: 17 }, // Banner for Firestorm
    { id: 'banner_2', image: img002, songId: 18 }, // Banner for Om Namo Bhagavate
    { id: 'banner_3', image: img003, songId: 19 }, // Banner for Chikitu
    { id: 'banner_4', image: img004, songId: 20 }, // Banner for Katyayani
    { id: 'banner_5', image: img005, songId: 21 }, // Banner for Young Black & Rich
];

export const albumsData = [
    { id: 0, name: "Top The Weeknd songs", image: img1, desc: "Here the weeknd top songs", bgColor: "#2a4365", categoryKey: "new" },
    { id: 1, name: "Top Songs India", image: img11, desc: "Here the top indian songs in trend", bgColor: "#22543d", categoryKey: "mass" },
    { id: 2, name: "Trending India", image: img21, desc: "Here the trending india songs", bgColor: "#742a2a", categoryKey: "dance" },
    { id: 3, name: "Trending Global", image: img31, desc: "Here the trending global tracks", bgColor: "#44337a", categoryKey: "global" },
    { id: 4, name: "Mega Hits", image: img41, desc: "Here trending telugu mega hit tracks", bgColor: "#234e52", categoryKey: "beat" },
    { id: 5, name: "Happy Favorites", image: img71, desc: "Here we created favorite songs for you", bgColor: "#744210", categoryKey: "love" },
];

// UPDATED: The 5 "unlisted" songs have been added here with new IDs and categories.
export const songsData = [
    { id: 0, name: "Starboy", image: img2, file: song1, desc: "The Weeknd - Starboy", duration: "3:50", category: "new" },
    { id: 1, name: "Sao Paulo", image: img3, file: song2, desc: "The Weeknd - Sao Paulo", duration: "5:10", category: "new" },
    { id: 2, name: "Timeless", image: img4, file: song3, desc: "The Weeknd - Timeless", duration: "4:16", category: "new" },
    { id: 3, name: "Blinding Lights", image: img5, file: song4, desc: "The Weeknd - Blinding Lights", duration: "3:23", category: "beat" },
    { id: 4, name: "Popular", image: img6, file: song5, desc: "The Weeknd - Popular", duration: "3:35", category: "love" },
    { id: 5, name: "I Was Never There", image: img7, file: song6, desc: "The Weeknd - I Was Never There", duration: "4:10", category: "love" },
    { id: 6, name: "paisa hai toh", image: img12, file: song12, desc: "farzi-paisa hai toh", duration: "3:10", category: "mass" },
    { id: 7, name: "pani pani", image: img13, file: song13, desc: "badshah-pani pani", duration: "3:10", category: "mass" },
    { id: 8, name: "chuttamalle", image: img14, file: song14, desc: "devara-chuttamalle", duration: "3:44", category: "love" },
    { id: 9, name: "daavudi", image: img15, file: song15, desc: "devara-daavudi", duration: "3:49", category: "dance" },
    { id: 10, name: "run it up", image: img16, file: song16, desc: "hanumankind-run it up", duration: "2:53", category: "beat" },
    { id: 11, name: "hua main", image: img17, file: song17, desc: "animal-hua main", duration: "4:38", category: "love" },
    { id: 12, name: "arjan vailly", image: img18, file: song18, desc: "animal-arjan vailly", duration: "3:20", category: "mass" },
    { id: 13, name: "tauba tauba", image: img19, file: song19, desc: "bad newz-tauba tauba", duration: "3:30", category: "mass" },
    { id: 14, name: "dabidi dibidi", image: img110, file: song110, desc: "daaku maharaj-dabidi dibidi", duration: "3:34", category: "beat" },
    { id: 15, name: "Like Him", image: img201, file: song201, desc: "Tyler,the creator", duration: "4:39", category: "global" },
    { id: 16, name: "O vasumathi", image: img202, file: song202, desc: "Yazin Nizar, Rita - Bharat Ane Nenu", duration: "4:33", category: "love" },
    // -- Newly Added Songs --
    { id: 17, name: "Firestorm", image: unlisted_song_1_image, file: unlisted_song_1_audio, desc: "They Call Him OG - Firestorm", duration: "4:05", category: "mass" },
    { id: 18, name: "Om Namo Bhagavate", image: unlisted_song_2_image, file: unlisted_song_2_audio, desc: "Mahavatar Narsimha-Om Namo Bhagavate", duration: "3:24", category: "mass" },
    { id: 19, name: "Chikitu", image: unlisted_song_3_image, file: unlisted_song_3_audio, desc: "Coolie-Chikitu", duration: "3:36", category: "dance" },
    { id: 20, name: "Katyayani", image: unlisted_song_4_image, file: unlisted_song_4_audio, desc: "Little Hearts-Katyayani", duration: "1:45", category: "love" },
    { id: 21, name: "Young Black & Rich", image: unlisted_song_5_image, file: unlisted_song_5_audio, desc: "Melly Mike-Young Black & Rich", duration: "3:35", category: "global" },
];