import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../services/dataService.js';

function createTemplate(submitHandler) {
    return html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form class="create-form" @submit=${submitHandler}>
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

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
