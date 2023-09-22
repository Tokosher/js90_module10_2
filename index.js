// fetch('https://jsonplaceholder.typicode.com/tasks')
//       .then(response => {
//         if (response.ok) {
//             return console.log(ok)
//         }

//         throw new Error('Response is not ok')
//       })
//     //   .then(json => console.log(json))
//     .catch((error) => console.log(error))

// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// API_KEY = "345007f9ab440e5b86cef51be6397df1";

// Щоб отримати постер фільму потрібно підставити url з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"
// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

// *********************** Кнопка "Load More" ************************** \\
// let page = 1;

// const selectors = {
//     container: document.querySelector('.js-movie-list'),
//     loadMore: document.querySelector('.js-load-more'),
// }

// selectors.loadMore.addEventListener('click', onLoadMore);

// serviceMovie()
// .then(result => {
//     const markup = createMarkup(result.results);
//     selectors.container.insertAdjacentHTML('beforeend', markup);

//     selectors.loadMore.classList.replace('load-more-hidden', 'load-more')
// })


// // makes request
// function serviceMovie(page = 1) {
//     const API_KEY = "345007f9ab440e5b86cef51be6397df1";
//     const BASE_URL = 'https://api.themoviedb.org/3';
//     const END_RESOURCE = '/trending/movie/week';

//     return fetch(`${BASE_URL}${END_RESOURCE}?api_key=${API_KEY}&page=${page}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
        
//             return response.json();
//         })
//         .catch(error => console.log(error))
// }


// function createMarkup (movieArr) {
//     return movieArr.map(({ poster_path, release_date, original_title, vote_average }) => `
//     <li class="movie-card">
//     <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}">
//     <div class="movie-info">
//     <h2>${original_title}</h2>
//     <p>Release date: ${release_date}</p>
//     <p>Vote average: ${vote_average}</p>
//     </div>
//     </li>
//     `)
//     .join('');
// }

// function onLoadMore () {
//     page += 1;

//     serviceMovie(page)
//     .then(result => {
//     const markup = createMarkup(result.results);
//     selectors.container.insertAdjacentHTML('beforeend', markup);
// })
// }



// ********************************Infinity scroll ********************** \\

let page = 1;

const selectors = {
    container: document.querySelector('.js-movie-list'),
    jsGuard: document.querySelector('.js-guard'),
}

const observer = new IntersectionObserver(handlerObserver);


serviceMovie()
.then(result => {
    const markup = createMarkup(result.results);
    selectors.container.insertAdjacentHTML('beforeend', markup);

    observer.observe(selectors.jsGuard);
})

// makes request
function serviceMovie(page = 1) {
    const API_KEY = "345007f9ab440e5b86cef51be6397df1";
    const BASE_URL = 'https://api.themoviedb.org/3';
    const END_RESOURCE = '/trending/movie/week';

    return fetch(`${BASE_URL}${END_RESOURCE}?api_key=${API_KEY}&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        
            return response.json();
        })
        .catch(error => console.log(error))
}


function createMarkup (movieArr) {
    return movieArr.map(({ poster_path, release_date, original_title, vote_average }) => `
    <li class="movie-card">
    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}">
    <div class="movie-info">
    <h2>${original_title}</h2>
    <p>Release date: ${release_date}</p>
    <p>Vote average: ${vote_average}</p>
    </div>
    </li>
    `)
    .join('');
}

function handlerObserver (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('ELEMENT WAS INTERSECTED');

            page += 1;

            serviceMovie(page)
                .then(result => {
            const markup = createMarkup(result.results);
            selectors.container.insertAdjacentHTML('beforeend', markup);
        })
        }
    })
}