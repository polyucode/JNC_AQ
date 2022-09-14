import axios from 'axios';

const token = {
    headers:{ Authorization: 'Bearer ' + localStorage.getItem('token') }
}

export const getPerfiles = async () => {

    const resp = await axios.get('/perfil', token);
    return Object.entries(resp.data.data).map(([key,value]) => (key, value));

}