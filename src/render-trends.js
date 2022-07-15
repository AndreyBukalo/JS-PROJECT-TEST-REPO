import { renderPoster } from "./api-keys";
export const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
export function renderCollection(movie) {
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
