import { html } from '../../node_modules/lit-html/lit-html.js';
import { myItems } from '../services/dataService.js';

function bookCard(book) {
    return html`

    `
}

function myBooksTemplate(books) {
    return html`


`}
export async function myBooksView (ctx) {
    let myBooks = await myItems(ctx.user._id)
    ctx.render(myBooksTemplate(myBooks));
}
