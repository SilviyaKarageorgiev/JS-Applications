import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItem } from '../services/dataService.js';

function editTemplate(item, submitHandler) {
    return html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${submitHandler}>
            <input type="text" name="title" id="job-title" placeholder="Title" value=${item.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${item.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${item.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${item.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${item.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${item.salary} />

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
