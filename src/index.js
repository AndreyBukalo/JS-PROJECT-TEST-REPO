import axios from 'axios';
const KEY = '23b145ee574a18aa201c7296bc0e9b2b';
const DEFAULT_URL = 'https://api.themoviedb.org/3';
const TRENDING = `${DEFAULT_URL}/trending/movie/week`;
const BY_SEARCH = `${DEFAULT_URL}/search/movie`;
const BY_ID = `${DEFAULT_URL}/movie/`;
const renderPoster = 'https://image.tmdb.org/t/p/w500';
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.next');
button.addEventListener('click', more);
let page = 1;
async function fetchTrendMovies(page) {
  try {
    const respone = await axios.get(`${TRENDING}?api_key=${KEY}&page=${page}`);
    return respone.data;
  } catch (error) {
    console.error('ERROR');
  }
}

fetchTrendMovies(page).then(data => {
  renderCollection(data);
  console.log(data.results);
});

function renderCollection(movie) {
  const markup = movie.results
    .map(movie => {
      const {
        id,
        title,
        poster_path,
        backdrop_path,
        genre_ids,
        overview,
        vote_average,
        release_date,
      } = movie;
      return `
       <img src="${renderPoster}${poster_path} " />
      <p>ID: ${id}</p>
       <p>${title}</p>
       <p>${overview}</p>
       <p>${vote_average.toFixed(1)}</p>
       <p>${release_date.slice(0, 4)}</p>
       <p>${genre_ids}</p>
        `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function more() {
  page += 1;
  fetchTrendMovies(page).then(data => {
    renderCollection(data);
    console.log(data);
  });
}

const genres = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ],
};
