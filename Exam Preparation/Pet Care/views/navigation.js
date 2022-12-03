import { html } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/userService.js';

function users(user, onLogout) {
    return html`
    <li><a href="/create">Create Postcard</a></li>
    <li><a href="#" @click=${onLogout}>Logout</a></li>
`}

const guests = html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>
`

function navigationTemplate(user, onLogout) {
    return html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            
            ${user ? users(user, onLogout) : guests}
    
        </ul>
    </nav>
`}

export function navigationView(ctx) {

    async function onLogout(e) {
        e.preventDefault();

        await logout();
        ctx.page.redirect('/');
    }

    return navigationTemplate(ctx.user, onLogout);
}
