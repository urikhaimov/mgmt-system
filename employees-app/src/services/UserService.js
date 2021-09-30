import axios from "axios";

export function getAllUsers() {
    return axios.get("/api/users").then((response) => response.data);
}

export function updateUserStatus(id, status) {
    return axios({
        method: 'post',
        url: `/api/users/${id}`,
        headers: {},
        data: {
            status: status
        }
    }).then((response) => response.data);
}

export function getStatusList() {
    return axios.get("/api/statusList").then((response) => response.data);
}

export function getFilteredUsers(text, status) {
    return axios.get(`/api/filtered`, { params: { search: text, status: status } })
        .then((response) => response.data);
}

export function createUser(data) {
    return axios({
        method: 'post',
        url: `/api/user`,
        headers: { 'Content-Type': 'application/json' },
        data: data
    }).then((response) => response.data);
}

