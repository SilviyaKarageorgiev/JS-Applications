import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../services/dataService.js';

function createTemplate(submitHandler) {
    return html`
<section id="create-meme">
    <form id="create-form" @submit=${submitHandler}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
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
