import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';


function loginTemplate(submitHandler) {
    return html`
<section id="loginPage">
    <form class="loginForm" @submit=${submitHandler}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`}

export function loginView(ctx) {

    async function submitHandler(e) {
        e.preventDefault();

        let form = e.target;
        let data = Object.fromEntries(new FormData(form));
        console.log(data);

        if (data.email == '' || data.password == '') {
            return alert('All fields must be entered');
        }

        await login(data);
        ctx.page.redirect('/');
    }

    ctx.render(loginTemplate(submitHandler));
}
