import axios from "axios";
const axiosapi = axios.create({
   baseURL: "https://localhost:7155",
   headers:{ 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
   },
});

export default axiosapi; 