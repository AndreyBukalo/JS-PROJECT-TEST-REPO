import axios from 'axios';
import { KEY, BY_TRENDS, BY_SEARCH, BY_ID, renderPoster } from './api-keys';

const gallery = document.querySelector('.gallery');
const button = document.querySelector('.next');
button.addEventListener('click', more);
let page = 1;

// Fetch полной инф-ы по трендам
async function fetchTrendMovies() {
  try {
    const { data } = await axios.get(
      `${BY_TRENDS}?api_key=${KEY}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error('ERROR');
  }
}
//Fetch by Search
async function fetchBySearchMovies(formInput, page) {
  try {
    const { data } = await axios.get(
      `${BY_SEARCH}?api_key=${KEY}&query=${formInput}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error('ERROR');
  }
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
function createGenresFromTrend(genres) {
  const gens = genres
    .map(id => genres.filter(element => element.id === id))
    .slice(0, 3)
    .flat();
}
const g = createGenresFromTrend(genres);

fetchTrendMovies().then(data => {
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
  fetchTrendMovies().then(data => {
    renderCollection(data);
    console.log(data);
  });
}
