import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../services/dataService.js';

function createTemplate(submitHandler) {
    return html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form class="create-form" @submit=${submitHandler}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`}

export function createView(ctx) {
    async function submitHandler(e) {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        let values = Object.values(data);

        if (values.includes('')) {
            return alert('All fields are required');
        }

        await createItem(data);
        ctx.page.redirect('/dashboard')
    }

    ctx.render(createTemplate(submitHandler))
}
