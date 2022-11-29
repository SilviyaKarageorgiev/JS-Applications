import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';


function loginTemplate(submitHandler) {
    return html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${submitHandler}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="#">Create an account</a>
            </p>
        </form>
    </div>
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
        ctx.page.redirect('/dashboard');
    }

    ctx.render(loginTemplate(submitHandler));
}
