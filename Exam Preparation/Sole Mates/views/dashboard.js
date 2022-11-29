import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../services/dataService.js';

function cardTemplate(x) {
    return html`
<li class="card">
    <img src="${x.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${x.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${x.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${x.value}</span>$</p>
    <a class="details-btn" href="/details/${x._id}">Details</a>
</li>
`}

function dashboardTemplate(allItems) {
    return html`
<section id="dashboard">
    <h2>Collectibles</h2>

    ${allItems.length > 0
    ? html`<ul class="card-wrapper">
        ${allItems.map(x => cardTemplate(x))}
    </ul>`
    : html`<h2>There are no items added yet.</h2>`}
    
    
</section>
`}

export async function dashboardView(ctx) {
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
}
