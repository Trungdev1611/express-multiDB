import api from "../../api"
import { DataPagninateUser, ParamsGetUserType } from "./type"



class UserAPI {
    async getUserList(params:ParamsGetUserType): Promise<DataPagninateUser> {
      const response = await api.getQuery("/users/getlist", params)
      return response.data
    }
  }
  
  const userAPI = new UserAPI()
  export default userAPI