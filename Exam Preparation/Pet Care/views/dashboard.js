import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../services/dataService.js';

function cardTemplate(x) {
    return html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${x.image}">
    </article>
    <h2 class="name">${x.name}</h2>
    <h3 class="breed">${x.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${x._id}">Details</a>
    </div>
</div>
`}

function dashboardTemplate(allItems) {
    return html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">

    ${allItems.length > 0
    	? allItems.map(x => cardTemplate(x))
    	: html`<div>
        <p class="no-pets">No pets in dashboard</p>
    </div>`}

    </div>
</section>
`}

export async function dashboardView(ctx) {
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
}
