import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItem } from '../services/dataService.js';

function editTemplate(item, submitHandler) {
    return html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form class="edit-form" @submit=${submitHandler}>
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" value="${item.brand}" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" value="${item.model}" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" value="${item.imageUrl}" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" value="${item.release}" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" value="${item.designer}" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" value="${item.value}" />

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
