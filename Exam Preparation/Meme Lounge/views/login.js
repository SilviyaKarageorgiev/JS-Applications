import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../services/userService.js';


function loginTemplate(submitHandler) {
    return html`
<section id="login">
    <form id="login-form" @submit=${submitHandler}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="#">Sign up</a>.</p>
            </div>
        </div>
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
        ctx.page.redirect('/dashboard');
    }

    ctx.render(loginTemplate(submitHandler));
}
