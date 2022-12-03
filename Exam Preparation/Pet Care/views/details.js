import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete) {

    return html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${item.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age}</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            <div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                ${user && user._id == item._ownerId
                    ? html`<div id="action-buttons">
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
                </div>`
                    : null}
                <!--(Bonus Part) Only for no creator and user-->
                <a href="#" class="donate">Donate</a>
            </div>
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
