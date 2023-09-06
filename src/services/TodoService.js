import axios from 'axios';

class TodoService {   
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL; 
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,      
      headers: {
        'Content-Type': 'application/json',         
      },
    });
  }

  // GET request method
  async get() {
    try {
      const response = await this.axiosInstance.get(`${this.baseURL}/todos`);
      return response;
    } catch (error) {      
      throw error;
    }
  }

  // POST request method
  async post(data) {
    try {
      const response = await this.axiosInstance.post(`${this.baseURL}/todos`, data);
      return response;
    } catch (error) {       
      throw error;
    }
  } 

   // PUT request method
   async put(id, data) {
    try {
        console.log(`${this.baseURL}/${id}`);
      const response = await this.axiosInstance.put(`${this.baseURL}/todos/${id}`, data);
      return response;
    } catch (error) {       
      throw error;
    }
  } 

}

export default new TodoService();
