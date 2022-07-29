import {
    movies
} from "../modules/db.js";

let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let promo__descr = document.querySelector(".promo__descr")
let imdb = document.querySelector(".imdb");
let reserch = document.querySelector(".reserch");
let search = document.querySelector('#search')
let del = document.querySelector('.delete')
let genUl = document.querySelector('.genresUl')
let genres_arr = ['All']

search.onkeyup = () => {
    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase()
        let value = search.value.toLowerCase().trim()

        if(title.includes(value)) {
            return item
        }
    })

    reload(filtered)
}



function reload(arr) {
    ul.innerHTML = ""
    changeFilm(arr[0])

    arr.forEach((movie, index) => {
        genres_arr.push(movie.Genre)

        let li = document.createElement('li')
        let del = document.createElement('div')

        li.innerHTML = `${index + 1}. ${movie.Title}`
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeFilm(movie)
        }

        del.onclick = () => {
            li.style.display = 'none'  
        }
    });

}
reload(movies)

let btns = document.querySelectorAll(".promo__menu-item")

function changeFilm(data) {
    promo__bg.style.backgroundImage = `url("${data.Poster}")`
    promo__genre.innerHTML = data.Genre
    promo__title.innerHTML = data.Title
    promo__descr.innerHTML = data.Plot
    imdb.innerHTML = `IMDb: ${data.imdbRating}`
    reserch.innerHTML = `Кинопоиск: ${data.Metascore}`
}

btns.forEach(btn => {
    btn.onclick = () => {
        btns.forEach(btn => {
            btn.classList.remove('promo__menu-item_active')
        })
        btn.classList.add('promo__menu-item_active')
    }
    
})

genres_arr = [...new Set(genres_arr)]

generateGenres(genres_arr)
function generateGenres(arr) {
    genUl.innerHTML = ""

    for(let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        if(arr.indexOf(item) === 0 ) {
            a.classList.add('promo__menu-item_active')
        }

        a.classList.add('promo__menu-item')
        a.href = "#"
        a.innerHTML = item


        li.append(a)
        genUl.append(li)
        // functions
        li.onclick = () => {
            genUl.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))

            li.firstChild.classList.add('promo__menu-item_active')


            let filtered = movies.filter(elem => {
                let genre = elem.Genre.toLowerCase()
                if(item.toLowerCase() === genre) {
                    return elem
                } else if(item.toLowerCase() === 'all') {
                    reload(movies)
                }
            })
            if(filtered.length > 0) reload(filtered)
            
        }
    }
}