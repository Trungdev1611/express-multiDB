import api from "../../api"
import { DataPagninateUser } from "./type"



class UserAPI {
    async getUserList(): Promise<DataPagninateUser> {
      const response = await api.get("/users/getlist")
      return response.data
    }
  }
  
  const userAPI = new UserAPI()
  export default userAPI