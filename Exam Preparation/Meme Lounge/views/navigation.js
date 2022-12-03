import { html } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/userService.js';

function users(user, onLogout) {
    return html`
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${user.email}</span>
            <a href="/myItems">My Profile</a>
            <a href="#" @click=${onLogout}>Logout</a>
        </div>
    </div>
`}

const guests = html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>
`

function navigationTemplate(user, onLogout) {
    return html`
    <a href="/dashboard">All Memes</a>
    
    ${user ? users(user, onLogout) : guests}
    
`}

export function navigationView(ctx) {

    async function onLogout(e) {
        e.preventDefault();

        await logout();
        ctx.page.redirect('/');
    }

    return navigationTemplate(ctx.user, onLogout);
}
