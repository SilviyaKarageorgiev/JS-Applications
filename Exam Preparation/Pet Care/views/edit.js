import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItem } from '../services/dataService.js';

function editTemplate(item, submitHandler) {
    return html`
<section id="editPage">
    <form class="editForm" @submit=${submitHandler}>
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${item.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${item.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${item.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${item.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${item.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
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
