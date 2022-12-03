import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/userService.js';

function registerTemplate(submitHandler) {
    return html`
<section id="register">
    <form id="register-form" @submit=${submitHandler}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
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
        if (data.password !== data['repeatPass']) {
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
