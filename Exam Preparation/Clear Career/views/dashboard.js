import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../services/dataService.js';

function cardTemplate(x) {
    return html`
<div class="offer">
    <img src="${x.imageUrl}" alt="example2" />
    <p>
        <strong>Title: </strong><span class="title">${x.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${x.salary}</span></p>
    <a class="details-btn" href="/details/${x._id}">Details</a>
</div>
`}

function dashboardTemplate(allItems) {
    return html`
<section id="dashboard">
    <h2>Job Offers</h2>

    ${allItems.length > 0
    	? allItems.map(offer=> cardTemplate(offer))
    	: html`<h2>No offers yet.</h2>`}

    
</section>

`}

export async function dashboardView(ctx) {
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
}
