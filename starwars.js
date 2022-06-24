import {play} from './music.js';
import { restartAnimation } from './restart-animation.js';

// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.dev/api';

const bodyEl = document.querySelector("body");
const navFilmesEl = document.querySelector("#filmes");
const preFilmeEl = document.querySelector("pre");

let numeroRomano = {1:"I  ",2:"II ",3:"III",4:"IV ",5:"V  ",6:"VI "};


//Exercicio 1
play({
    audioUrl:"audio/tema-sw.mp3",
    coverImageUrl:"imgs/logo.svg",
    title:"Intro",
    artist:"John Willians"
},bodyEl);

//Exercicio 3
function trocaDescricaoFilme(filme){
    let texto = `Episode ${numeroRomano[filme.episode_id]}
    ${filme.opening_crawl}`;

    preFilmeEl.innerHTML = texto;
    restartAnimation(preFilmeEl);
}

//Exercicio 5
async function friendlyFetch(){
    let resultado;

    if(!localStorage.getItem(API_ENDPOINT)){
        resultado = await fetch(API_ENDPOINT + "/films").then(resposta => resposta.json());
        localStorage.setItem(API_ENDPOINT,JSON.stringify(resultado));
    }else{
        resultado = JSON.parse(localStorage.getItem(API_ENDPOINT));
    }

    return resultado;
}
//Exercicio 2
async function insereListaDeFilmes(){
    let filmes = await friendlyFetch();
    filmes = filmes.results;

    //Exercicio 4
    filmes.sort((f1,f2) => f1.episode_id - f2.episode_id);

    let lista = document.createElement("ul");

    for(let filme of filmes){
        let li = document.createElement("li");
        li.innerHTML = `Episode ${numeroRomano[filme.episode_id]} - ${filme.title}`;
        li.onclick = () => trocaDescricaoFilme(filme);
        lista.appendChild(li);
    }

    navFilmesEl.innerHTML = "";
    navFilmesEl.append(lista);
}

insereListaDeFilmes();

//Exercicio 3



