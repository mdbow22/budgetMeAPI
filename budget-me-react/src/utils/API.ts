import { getToken } from './Auth';

const API = {
    post: async function(path: string, body: object, needsAuth?: boolean) {

        let token;
        if(needsAuth) {
            token = getToken();
        }
        const response = await fetch(`/api${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if(response.ok) {
             return data;
        }

        throw data;
    },
    get: async function(path: string, token?: string) {
        const response = await fetch(`/api${path}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        });

        const data = response.json();

        if(response.ok) {
            return data;
        }

        throw data;
    }
}

export default API;