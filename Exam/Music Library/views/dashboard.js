import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../services/dataService.js';

function cardTemplate(x) {
    return html`
<li class="card">
    <img src="${x.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${x.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${x.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${x.sales}</span></p>
    <a class="details-btn" href="/details/${x._id}">Details</a>
</li>
`}

function dashboardTemplate(allItems) {
    return html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        
        ${allItems.length > 0
    	? allItems.map(x => cardTemplate(x))
    	: html`<h2>There are no albums added yet.</h2>`}

    </ul>

</section>
`}

export async function dashboardView(ctx) {
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
}
