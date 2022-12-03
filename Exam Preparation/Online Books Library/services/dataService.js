import * as api from '../api.js';

const endpoints = {
    getAllData: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    details: (id) => `/data/books/${id}`,
    edit: (id) => `/data/books/${id}`,
    delete: (id) => `/data/books/${id}`,
    myItems: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

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
