import { getToken } from "./authenticate";

const apiPrefix = process.env.NEXT_PUBLIC_USER_API_URL;

export async function addToFavourites(id) {
    const res = await fetch(`${apiPrefix}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function removeFromFavourites(id) {
    const res = await fetch(`${apiPrefix}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function getFavourites() {
    const res = await fetch(`${apiPrefix}/favourites`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function addToHistory(id) {
    const res = await fetch(`${apiPrefix}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function removeFromHistory(id) {
    const res = await fetch(`${apiPrefix}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}

export async function getHistory() {
    const res = await fetch(`${apiPrefix}/history`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });    
    const data = await res.json();    
    return res.status === 200 ? data : [];
}