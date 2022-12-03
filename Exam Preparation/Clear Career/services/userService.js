import * as api from '../api.js';
import * as session from './authService.js';


export async function login (data)  {
    let user = await api.post('/users/login', data);
    session.setUser(user);
}

export async function register (data) {
    const user = await api.post('/users/register', data);
    session.setUser(user);
}

export async function logout () {
    await api.get('/users/logout');
    session.removeUser();
};
