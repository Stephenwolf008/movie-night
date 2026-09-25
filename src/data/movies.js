const localPoster = (file) => `${import.meta.env.BASE_URL}${file}`;

export const movies = [
  {
    id: "m1",
    title: "The Vvaan - Force of the Forest",
    language: "Hindi",
    genre: ["Adventure", "Fantasy"],
    certification: "UA",
    mood: ["Action", "Interesting"],
    posterUrl: localPoster("vvaan.jpg"),
    trailerUrl: "https://www.youtube.com/embed/ed6E9UFv7jQ",
    description: "A mysterious adventure where heroes must traverse an ancient, glowing forest to save their world."
  },
  {
    id: "m2",
    title: "Hanuman Ansh",
    language: "Hindi",
    genre: ["Animation"],
    certification: "U",
    mood: ["Fun", "Feel-good"],
    posterUrl: localPoster("hanuman.jpg"),
    trailerUrl: "https://www.youtube.com/embed/YpGhCA2X3gU",
    description: "A grieving boy finds faith and purpose in a story inspired by the life of Neem Karoli Baba."
  },
  {
    id: "m3",
    title: "Forgotten Island",
    language: "English",
    genre: ["Adventure", "Thriller"],
    certification: "UA",
    mood: ["Thriller", "Interesting"],
    posterUrl: localPoster("island.jpg"),
    trailerUrl: "https://www.youtube.com/embed/lprJpWgAWSs",
    description: "Two lifelong friends reunite for an adventure rooted in Filipino folklore."
  },
  {
    id: "m4",
    title: "VIBE",
    language: "Hindi",
    genre: ["Action", "Comedy"],
    certification: "A",
    mood: ["Fun", "Action"],
    posterUrl: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/400x600/2026/vibe/poster.jpg",
    trailerUrl: "https://www.youtube.com/embed/meknZizkusk",
    description: "Two very different friends stumble into a conspiracy and an adventure far bigger than either of them."
  },
  {
    id: "m5",
    title: "Resident Evil",
    language: "English",
    genre: ["Horror", "Action", "Thriller"],
    certification: "R",
    mood: ["Thriller", "Action"],
    posterUrl: "https://www.upcominghorrormovies.com/sites/default/files/residentevilposter_1.jpg",
    trailerUrl: "https://www.youtube.com/embed/mNd1gb19A-c",
    description: "A medical courier’s last delivery turns into a desperate fight to survive one horrifying night."
  },
  {
    id: "m6",
    title: "Mirzapur: The Movie",
    language: "Hindi",
    genre: ["Action", "Crime", "Thriller"],
    certification: "A",
    mood: ["Action", "Interesting", "Thriller"],
    posterUrl: "https://images.filmibeat.com/ph-big/2026/02/mirzapur-the-movie-release-date-big-screen-gang-saga1770279344_0.jpeg",
    trailerUrl: "https://www.youtube.com/embed/5vMWZhHPlaw",
    description: "An untold chapter in Mirzapur’s power struggle brings old rivals and a new claimant together."
  },
  {
    id: "m7",
    title: "Spider-Man: Brand New Day",
    language: "English",
    genre: ["Action", "Adventure", "Fantasy"],
    certification: "NR",
    mood: ["Action", "Interesting"],
    posterUrl: "https://amc-theatres-res.cloudinary.com/image/upload/f_auto/q_auto%3Alow/amc-cdn/content/general/yeooe33vngq2grdl4rku.jpg",
    trailerUrl: "https://www.youtube.com/embed/BwntXFBNfOA",
    description: "Peter Parker faces a new chapter as Spider-Man in a city that no longer remembers him."
  },
  {
    id: "m8",
    title: "The Odyssey",
    language: "English",
    genre: ["Adventure", "Fantasy", "Action"],
    certification: "R",
    mood: ["Action", "Interesting"],
    posterUrl: "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/regions/ca/onesheet.jpg",
    trailerUrl: "https://www.youtube.com/embed/f_bKjZeJBBI",
    description: "Odysseus faces a mythic journey home in Christopher Nolan’s epic retelling of Homer."
  },
  {
    id: "m9",
    title: "The Magic Faraway Tree",
    language: "English",
    genre: ["Adventure", "Fantasy", "Family"],
    certification: "PG",
    mood: ["Fun", "Feel-good"],
    posterUrl: "https://tr.web.img2.acsta.net/img/e2/fd/e2fdec7b902bd6193677e0d37cf5d4e0.jpg",
    trailerUrl: "https://www.youtube.com/embed/PAUEwUhAjzg",
    description: "A family discovers an enchanted tree that leads its children into fantastical worlds."
  }
];
