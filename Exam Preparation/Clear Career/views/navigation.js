import { html } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/userService.js';

function users(user, onLogout) {
    return html`
    <div class="user">
        <a href="/create">Create Offer</a>
        <a href="#" @click=${onLogout}>Logout</a>
    </div>
`}

const guests = html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`

function navigationTemplate(user, onLogout) {
    return html`
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
    
    <nav>
        <div>
            <a href="/dashboard">Dashboard</a>
        </div>
    
        ${user ? users(user, onLogout) : guests}
    
    </nav>
`}

export function navigationView(ctx) {

    async function onLogout(e) {
        e.preventDefault();

        await logout();
        ctx.page.redirect('/dashboard');
    }

    return navigationTemplate(ctx.user, onLogout);
}
