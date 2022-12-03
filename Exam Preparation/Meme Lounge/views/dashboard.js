import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../services/dataService.js';

function cardTemplate(x) {
    return html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${x.title}</p>
            <img class="meme-image" alt="meme-img" src="${x.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${x._id}">Details</a>
        </div>
    </div>
</div>
`}

function dashboardTemplate(allItems) {
    return html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">

        ${allItems.length > 0
    	? allItems.map(x => cardTemplate(x))
    	: html`<p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>
`}

export async function dashboardView(ctx) {
    const allItems = await getAllItems();
    ctx.render(dashboardTemplate(allItems));
}
