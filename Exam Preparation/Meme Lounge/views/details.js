import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete) {

    return html`
<section id="meme-details">
    <h1>Meme Title: ${item.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${item.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${item.description}</p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->

            ${user && user._id == item._ownerId
                ? html`<div id="action-buttons">
                <a class="button warning" href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a class="button danger" href="#" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
                : null}

        </div>
    </div>
</section>
`}

export async function detailsView(ctx) {
    let item = await getItem(ctx.params.id);

    async function onDelete(e) {
        e.preventDefault();

        await deleteItem(ctx.params.id);
        ctx.page.redirect('/');
    }
    ctx.render(await detailsTemplate(item, ctx.user, onDelete));
}
