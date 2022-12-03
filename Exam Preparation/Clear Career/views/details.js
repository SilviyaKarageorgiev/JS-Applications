import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete) {

    return html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${item.imageUrl}" alt="example1" />
        <p id="details-title">${item.title}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${item.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${item.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${item.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${item.applications}</strong></p>

        ${user && user._id == item._ownerId
        ? html`<div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>`
        : null}

        <!--Bonus - Only for logged-in users ( not authors )-->
        <a href="" id="apply-btn">Apply</a>
    </div>
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
