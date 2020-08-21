import axios from 'axios'

let http = axios.create({
    baseURL:"http://127.0.0.1:8888/api/private/v1/"
});

http.interceptors.request.use(config => {
    sessionStorage.getItem('TOKEN') != null ? config.headers['Authorization'] = sessionStorage.getItem('TOKEN') : '';
    return config;
})

http.interceptors.response.use(
    response=>{
        if(response.data.meta.status!=200){
            return Promise.reject(response.data.meta)
        }else{
            return Promise.resolve(response.data.data)
        }
    }
)

export default http;
