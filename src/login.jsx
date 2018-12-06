import axios from 'axios';

export function login(userData) {
    return dispatch => {

        return axios.post('/api/auth', data);




        // return (
        //     fetch('login/api/users', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(userData),
        //     }).then(response => {
        //         if (response.ok) {
        //             console.log("Works");
        //         } else {
        //             console.log("Fails");
        //         }
        //     })
        //     .catch(err => {
        //         console.log("catch Error");
        //     })   
        // )}
    }
}