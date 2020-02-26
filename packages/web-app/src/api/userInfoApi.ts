import axios from 'axios';

export function fetchUserInfo() {
    console.log("We're in fetchUserInfo");
    axios.get('/user/info').then((response) => {
        console.log(response);
        return response;
    });
}
