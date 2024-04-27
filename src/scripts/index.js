/* Desenvolva sua lógica aqui ... */

import { albumList, genresList } from "./productsData.js";
import { handleCustomInputRange } from "./input.js";
import { themeChange, verifyTheme } from "./theme.js";


const renderGenreItems = (genres) => {
  const ulGenreList = document.querySelector(".genres__list");

  genres.forEach((genre) => {
    const liGenre = document.createElement("li");
    liGenre.innerText = genre;
    liGenre.classList.add("genre__item", "text3");
    if (genre === "Todos") {
      liGenre.classList.add("active");
    }
    ulGenreList.appendChild(liGenre);
  }
)};


const createAlbumCard = (albumData) => {
  // CRIANDO OS ELEMENTOS
  const card = document.createElement("li");

  const albumCoverContainer = document.createElement("figure");
  const albumCoverImg = document.createElement("img");
  const albumDetails = document.createElement("div");
  const albumBand = document.createElement("span");
  const albumYear = document.createElement("span");
  const albumGenre = document.createElement("span");
  const albumTitle = document.createElement("h3");
  const albumPriceContainer = document.createElement("div");
  const albumPrice = document.createElement("h3");
  const albumBuyButton = document.createElement("button");

  // CARD
  card.classList.add("album__item");
  card.classList.add("slide");

  // COVER IMG
  albumCoverContainer.classList.add("album__cover-container");
  albumCoverImg.classList.add("album__cover");
  albumCoverImg.src = albumData.img;
  albumCoverContainer.appendChild(albumCoverImg);

  // ALBUM INFO
  albumDetails.classList.add("album__details");

  albumBand.classList.add("album__band");
  albumYear.classList.add("album__year");
  albumGenre.classList.add("album__genre");

  albumBand.innerText = albumData.band;
  albumYear.innerText = albumData.year;
  albumGenre.innerText = albumData.genre;
  albumDetails.append(albumBand, albumYear, albumGenre);
  // TITLE
  albumTitle.classList.add("album__name");
  albumTitle.innerText = albumData.title;

  // PRICE CONTAINER
  albumPriceContainer.classList.add("album__price--container");

  albumPrice.classList.add("album__price");
  albumPrice.innerText = "R$ " + albumData.price;
  albumBuyButton.classList.add("album__buy--button");
  albumBuyButton.innerText = "Comprar";
  albumPriceContainer.append(albumPrice, albumBuyButton);
  // ADD ALL
  card.append(
    albumCoverContainer,
    albumTitle,
    albumDetails,
    albumTitle,
    albumPriceContainer
  );

  return card;
};


const renderAlbumCards = (albums) => {
  const ulAlbumList = document.querySelector(".albums__list");
  ulAlbumList.innerHTML = "";

  albums.forEach((album) => {
    const albumCard = createAlbumCard(album);
    ulAlbumList.appendChild(albumCard);
  }
)};


const handleFilter = (albums, genreFilter = "Todos", priceFilter) => {
  const filteredAlbums = albums.filter(currentAlbum => (
    (currentAlbum.genre === genreFilter || genreFilter === "Todos") &&
    currentAlbum.price <= priceFilter
  ));

  return filteredAlbums;
};

const removeActiveClass = (genres) => {
  genres.forEach((genre) => {
    genre.classList.remove("active");
  }
)};

const handleFilterEvents = (albums) => {
  const genres = document.querySelectorAll(".genre__item");
  const inputPriceRange = document.querySelector(".price__input-range");
  const spanPriceValue = document.querySelector(".price-range__value--dynamic");

  let genreCategory = "Todos";
  let priceValue = inputPriceRange.valueAsNumber;

  genres.forEach((genre) => {
      genre.addEventListener("click", function (event) {
      removeActiveClass(genres);
      genre.classList.add("active");
      genreCategory = event.target.innerText;

      const albumsToRender = handleFilter(albums, genreCategory, priceValue);
      renderAlbumCards(albumsToRender);
    })
  });

  inputPriceRange.addEventListener("input", function (event) {
    priceValue = event.target.value;
    spanPriceValue.innerText = "R$ " + priceValue;
    const albumsToRender = handleFilter(albums, genreCategory, priceValue);

    renderAlbumCards(albumsToRender);
  });
};



renderGenreItems(genresList);
handleFilterEvents(albumList);
renderAlbumCards(albumList);
handleCustomInputRange();
themeChange();
verifyTheme();
