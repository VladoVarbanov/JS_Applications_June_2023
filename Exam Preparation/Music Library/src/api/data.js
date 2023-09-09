import { del, get, post, put } from "./api.js";

const endpoints = {
  albums: "/data/albums",
  getAllAlbums: "/data/albums?sortBy=_createdOn%20desc",
  search: "/data/albums?where=name",
  likes: "/data/likes",
};

export async function getAllAlbums() {
  return get(endpoints.getAllAlbums);
}

export async function getById(id) {
  return get(endpoints.albums + "/" + id);
}

export async function deleteById(id) {
  return del(endpoints.albums + "/" + id);
}

export async function createAlbum(data) {
  return post(endpoints.albums, data);
}

export async function editAlbum(id, albumData) {
  return put("/data/albums/" + id, albumData);
}

///data/albums?where=name%20LIKE%20%22${query}%22
export async function searchAlbum(query) {
  return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export async function giveLike(albumId) {
  return post(endpoints.likes, albumId);
}

export async function getLikes(albumId) {
  return get(
    `/data/likes?where=albumId%3D%22%7B${albumId}%7D%22&distinct=_ownerId&count`
  );
}
