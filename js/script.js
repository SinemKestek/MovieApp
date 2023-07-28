const global ={
    currentPage:window.location.pathname,
};



async function displayPopularMovie(){
    const {results} =await fetchAPIData('movie/popular');
    // console.log(results)
    results.forEach( (movie) => {
        const div= document.createElement('div');
        div.classList.add('card');
        div.innerHTML= ` 
        <a href="movie-details.html?id=${movie.id}">
        ${movie.poster_path ? ` <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        class="card-img-top" 
        alt="${movie.title}"></img>`
        :
      ` <img src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"`
       
    
    }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release:${movie.release_date}</small>
        </p>
        </div>
        `
       document.querySelector('#popular-movies').appendChild(div);
  

    });
}


async function displayPopularShow(){
    const {results} =await fetchAPIData('tv/popular');
    // console.log(results)
    results.forEach((show) => {
        const div= document.createElement('div');
        div.classList.add('card');
        div.innerHTML= ` 
        <a href="tv-details.html?id=${show.id}">
        ${show.poster_path ?` <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
        class="card-img-top" 
        alt="${show.name}"></img>`
        :
      ` <img src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"`
    
    }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Dte:${show.first_air_date}</small>
        </p>
        </div>
        `
       document.querySelector('#popular-shows').appendChild(div);
  

    });
}
//movie detail
 async function movieDetails(){
    const movieId=window.location.search.split('=')[1];
    console.log(movieId);
    const movie=await fetchAPIData(`movie/${movieId}`);
    const div = document.createElement('div');
    div.innerHTML=` 
    <div class="details-top">
    
    ${movie.poster_path ? ` <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
    class="card-img-top" 
    alt="${movie.title}">
    </img>`
    :
  ` <img src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"`  }

   </div>
    <div>
      <h2> ${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary">${movie.vote_average.toFixed(1)/1}</i>
        8 / 10
      </p>
      <p class="text-muted">Release Date:${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre)=>`<li>${genre.name}</li>.join('')`)}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
   
  </div>`;

 document.querySelector('#movie-details').appendChild(div);

}




async function showDetails(){

    const showId=window.location.search.split('=')[1];
    console.log(showId);
    const show=await fetchAPIData(`tv/${showId}`);
    const div = document.createElement('div');
    div.innerHTML= `
    <div class="details-top">
    <div>
    ${show.poster_path ? ` <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
    class="card-img-top" 
    alt="${show.title}">
    </img>`
    :
  ` <img src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.title}"`  }

    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary">  </i>${show.vote_average.toFixed(1)}/10
       
      </p>
      <p class="text-muted">Release Date: ${show.release_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  
    `

   document.querySelector('#show-details').appendChild(div);


}
//Fetch Data
async function fetchAPIData(endpoint){
    const API_KEY ='2b9b1b9f1c0919c4530fe2f420485043';
    const API_URL='https://api.themoviedb.org/3/';

   spinner();
 

    const response=await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data=await response.json();
    spinnerHide();
    return data;
 
}

function spinner (){
    document.querySelector('.spinner').classList.add('show');

}
function spinnerHide(){
    document.querySelector('.spinner').classList.remove('show');
}

function highlightActive(){
    const links=document.querySelectorAll('.nav-link');
    links.forEach( (link) => {
        if (link.getAttribute('href')=== global.currentPage) {
            link.classList.add('active');
        }
    });
}

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovie();
            console.log('Home');
            break;
       case '/shows.html':
                displayPopularShow();

                console.log('shows');
                break

        case '/movie-details.html':
            movieDetails();
            break;
            case '/search.html':
                console.log('searh');
                break;

       case '/tv-details.html':
        showDetails();
        break;

       

    }
 highlightActive();


}
document.addEventListener('DOMContentLoaded',init);