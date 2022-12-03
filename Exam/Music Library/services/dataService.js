import * as api from '../api.js';

const endpoints = {
    getAllData: '/data/albums?sortBy=_createdOn%20desc',
    create: '/data/albums',
    details: (id) => `/data/albums/${id}`,
    edit: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    myItems: (userId) => ``,
    like: '/data/likes',
    totalLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    userLikes: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`

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
export const addLike = async (data) => {
    return await api.post(endpoints.like, data);
}

export const getCountLikes = async (albumId) => {
    return api.get(endpoints.totalLikes(albumId));
}

export const getUserOwnLikes = async (albumId, userId) => {
    return api.get(endpoints.userLikes(albumId, userId));
}