import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

function registerTemplate(submitHandler) {
    return html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${submitHandler}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
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
        if (data.password !== data['re-password']) {
            return alert('Passwords don\'t match!');
        }
        let user = {
            email: data.email,
            password: data.password
        }
        await register(user);
        ctx.page.redirect('/dashboard');
    }

    ctx.render(registerTemplate(submitHandler));
}
