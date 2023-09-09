import { del, get, post, put } from "./api.js";

const endpoints = {
  albums: "/data/albums",
  getAllAlbums: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  search: "/data/albums?where=name",
};

export async function getAllAlbums() {

  return get(endpoints.getAllAlbums);
}

export async function deleteById(id) {

  return del("/data/albums/" + id);
}

export async function getById(id) {

  return get(endpoints.albums + "/" + id);
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
