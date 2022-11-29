import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete) {

    return html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${item.brand}</span></p>
            <p>
                Model: <span id="details-model">${item.model}</span>
            </p>
            <p>Release date: <span id="details-release">${item.release}</span></p>
            <p>Designer: <span id="details-designer">${item.designer}</span></p>
            <p>Value: <span id="details-value">${item.value}</span></p>
        </div>

        ${user && user._id == item._ownerId
        ? html`<div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>`
        : null}
        
    </div>
</section>
`}

export async function detailsView(ctx) {
    let item = await getItem(ctx.params.id);

    async function onDelete(e) {
        e.preventDefault();

        await deleteItem(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
    ctx.render(await detailsTemplate(item, ctx.user, onDelete));
}
