import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete) {

    return html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <div class="actions">

            ${user && user._id == item._ownerId
                ? html`<div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
                : null}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a class="button" href="#">Like</a>

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
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
