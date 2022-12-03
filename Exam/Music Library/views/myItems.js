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


//Books
// function bookCard(book) {
//     return html`
// <li class="otherBooks">
//     <h3>${book.title}</h3>
//     <p>Type: ${book.type}</p>
//     <p class="img"><img src="/images/${book.imageUrl}.png"></p>
//     <a class="button" href="/details/${book._id}">Details</a>
// </li>
//     `
// }

// function myBooksTemplate(books) {
//     return html`
// <section id="my-books-page" class="my-books">
//     <h1>My Books</h1>
//     <!-- Display ul: with list-items for every user's books (if any) -->
//     <ul class="my-books-list">

//     ${books.length > 0
//     	? books.map(b => bookCard(b))
//     	: html`<p class="no-books">No books in database!</p>`}
        
//     </ul>

// </section>

// `}
// export async function myBooksView(ctx) {
//     let myBooks = await myItems(ctx.user._id);
    
//     ctx.render(myBooksTemplate(myBooks));
// }

//Profile
// function bookCard(book) {
//     return html`
// <div class="user-meme">
//     <p class="user-meme-title">${book.title}</p>
//     <img class="userProfileImage" alt="meme-img" src="${book.imageUrl}">
//     <a class="button" href="/details/${book._id}">Details</a>
// </div>
//     `
// }

// function myBooksTemplate(result, user) {
//     return html`
// <section id="user-profile-page" class="user-profile">
//     <article class="user-info">
//         <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
//         <div class="user-content">
//             <p>Username: ${user.username}</p>
//             <p>Email: ${user.email}</p>
//             <p>My memes count: ${result.length}</p>
//         </div>
//     </article>
//     <h1 id="user-listings-title">User Memes</h1>
//     <div class="user-meme-listings">
//         <!-- Display : All created memes by this user (If any) -->
        
//         ${result.length > 0
//     	? result.map(bookCard)
//     	: html`<p class="no-memes">No memes in database.</p>`}

//     </div>
// </section>

// `}
// export async function myBooksView(ctx) {

//     let results = await myItems(ctx.user._id);
//     console.log(ctx.user);
//     ctx.render(myBooksTemplate(results, ctx.user));
// }