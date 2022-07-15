import axios from 'axios';
import { KEY, BY_TRENDS, BY_SEARCH, BY_ID, renderPoster } from './api-keys';
import { renderCollection, gallery } from './render-trends';

const form = document.querySelector('.search-form')
const button = document.querySelector('.next');
button.addEventListener('click', more);
form.addEventListener('submit', fetchResolved);
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
function fetchResolved(event) {
  event.preventDefault();
  page = 1;
  formInput = form.elements.searchQuery.value.trim();
  fetchBySearchMovies(formInput).then(data => {
    gallery.innerHTML = '';
    renderCollection(data);
    console.log(data.results);
  });
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




fetchTrendMovies().then(data => {
  renderCollection(data);
  console.log(data.results);
});


function more() {
  page += 1;
  fetchTrendMovies().then(data => {
    renderCollection(data);
    console.log(data);
  });
}
