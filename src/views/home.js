import { headerComponent } from "./../components/header.js";
import { data } from "./../data/dataset.js";
import { footerComponent } from "./../components/footer.js";
//import { sortData, filterData, computeStats, computeStatsScore } from "./../lib/dataFunctions.js";

export const home = () => {

	const root = document.createElement("div");

	const viewHeader = headerComponent();
	root.appendChild(viewHeader);

	const viewCards = renderItems(data);
	root.appendChild(viewCards)

	const footer = footerComponent();
	root.appendChild(footer);

	return root;
};

export const renderItems = (data) => {
	let html = '';

	data.forEach(function (film) {
		html += `<li class="cards" itemscope itemtype="movie">
                <dl>
                  <img src="${film.imageUrl}" alt=Imagen de la película: ${film.name} />
                  <dt></dt><dd class="name-movie" itemprop="name"><strong>${film.name}</strong></dd>
                  <dt></dt><dd class="year-movie" itemprop="yearMovie"><strong>(${film.facts.yearMovie})</strong></dd>
                  <dt></dt><dd class= "info-movie" itemprop="shortDescription">${film.shortDescription}</dd>
                  <dt></dt><dd itemprop="genreMovie"><strong>Género: </strong>${film.facts.genreMovie}</dd>
                </dl>
              </li>`;
	});

	const filmsList = document.createElement("ul");
	filmsList.innerHTML = html;

	return filmsList;
};
