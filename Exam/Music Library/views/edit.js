import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItem } from '../services/dataService.js';

function editTemplate(item, submitHandler) {
    return html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${submitHandler}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${item.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" value="${item.album}" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${item.imageUrl}" />
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${item.release}" />
            <input type="text" name="label" id="album-label" placeholder="Label" value="${item.label}" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${item.sales}" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`}

export async function editView(ctx) {
    const item = await getItem(ctx.params.id);

    async function submitHandler(e) {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));
        let values = Object.values(data);

        if (values.includes('')) {
            return alert('All fields must be filled')
        }

        await editItem(ctx.params.id, data);
        ctx.page.redirect(`/details/${item._id}`)
    }

    ctx.render(editTemplate(item, submitHandler));
}
