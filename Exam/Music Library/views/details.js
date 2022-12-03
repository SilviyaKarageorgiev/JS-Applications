import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItem, deleteItem, addLike, getUserOwnLikes, getCountLikes } from '../services/dataService.js';


async function detailsTemplate(item, user, onDelete, onLike, count, userLikes) {

    return html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${item.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${count}</span></div>
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">

            ${user &&user?._id !== item._ownerId && userLikes === 0
            ? html`
            <a href="javascript:void(0)" id="like-btn" @click=${onLike}>Like</a>`
            : null}


            ${user && user._id === item._ownerId
            ? html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
            `
            : null}
        </div>
    </div>
</section>
`}

export async function detailsView(ctx) {
    let item = await getItem(ctx.params.id);
    let totalLikes = await getCountLikes(item._id)
    let userLikes;
    if (ctx.user) {
        userLikes = await getUserOwnLikes(item._id, ctx.user._id);
    }
    async function onLike(e) {
        e.preventDefault();
        await addLike({ albumId: item._id });

        ctx.page.redirect(`/details/${item._id}`)
    }
    async function onDelete(e) {
        e.preventDefault();

        await deleteItem(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
    ctx.render(await detailsTemplate(item, ctx.user, onDelete, onLike, totalLikes, userLikes));
}
