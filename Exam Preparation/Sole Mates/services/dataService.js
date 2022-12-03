import * as api from '../api.js';

const endpoints = {
    getAllData: '/data/shoes?sortBy=_createdOn%20desc',
    create: '/data/shoes',
    details: (id) => `/data/shoes/${id}`,
    edit: (id) => `/data/shoes/${id}`,
    delete: (id) => `/data/shoes/${id}`,
    myItems: (userId) => ``,

}

export async function getAllItems() {
    return await api.get(endpoints.getAllData);
}

export async function createItem(data) {
    return await api.post(endpoints.create, data);
}

export async function getItem(id) {
    return await api.get(endpoints.details(id));
}

export async function editItem(id, data) {
    return await api.put(endpoints.edit(id), data)
}

export async function deleteItem(id) {
    return await api.del(endpoints.delete(id));
}

export async function myItems(userId) {
    return await api.get(endpoints.myItems(userId));
}
