import { del, get, post, put } from "./api.js";

const endpoints = {
  facts: "/data/facts",
  getAllFacts: "/data/facts?sortBy=_createdOn%20desc",
  search: "/data/albums?where=name",
};

export async function getAllFacts() {
  return get(endpoints.getAllFacts);
}

export async function getById(id) {
  return get(endpoints.facts + "/" + id);
}

export async function deleteById(id) {
  return del("/data/facts/" + id);
}

export async function createFact(data) {
  return post(endpoints.facts, data);
}

export async function editAlbum(id, albumData) {
  return put("/data/facts/" + id, albumData);
}
