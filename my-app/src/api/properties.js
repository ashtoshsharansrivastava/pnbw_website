import { sites as  properties } from '../data/frontend.js'; // your existing list
export const list = async () => properties;
export const get = async (id) => properties.find(p => p.id === Number(id));