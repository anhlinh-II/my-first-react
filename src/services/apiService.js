import axios from "../utils/axiosCustomize.js";

const postCreateNewUser = (email, password, username, role, image) => {
     // submit data
     const data = new FormData();
     data.append('email', email);
     data.append('password', password);
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
     return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
     // submit data
     const data = new FormData();
     data.append('id', id)
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.put('api/v1/participant', data)
}

const deleteUser = (userId) => {
     return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUsersWithPaginate = (page, limit) => {
     return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (userEmail, userPassword) => {
     return axios.post(`api/v1/login`
          , { email: userEmail, password: userPassword })
}

const postSignUp = (email, password, username) => {
     // submit data
     const data = new FormData();
     data.append('email', email);
     data.append('password', password);
     data.append('username', username);
     data.append('role', 'USER');
     data.append('userImage', '');

     return axios.post('api/v1/participant', data)
}

export {
     postCreateNewUser, getAllUsers,
     putUpdateUser, deleteUser,
     getUsersWithPaginate, postLogin, postSignUp
}