import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

function registerTemplate(submitHandler) {
    return html`
<section id="registerPage" >
    <form class="registerForm" @submit=${submitHandler}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`}

export function registerView(ctx) {
    async function submitHandler(e) {
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);

        if (Object.values(data).includes('')) {
            return alert('All fields must be provided');
        }
        if (data.password !== data['repeatPassword']) {
            return alert('Passwords don\'t match!');
        }
        let user = {
            email: data.email,
            password: data.password
        }
        await register(user);
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(submitHandler));
}
