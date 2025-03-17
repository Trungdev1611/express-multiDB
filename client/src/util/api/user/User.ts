import api from "../../api"
import { DataPagninateUser, ParamsCreateNewUser, ParamsGetUserType, PayloadDelete } from "./type"



class UserAPI {
    async getUserList(params:ParamsGetUserType): Promise<DataPagninateUser> {
      const response = await api.getQuery("/users/getlist", params)
      return response.data
    }

    async createNewUser(data: ParamsCreateNewUser) {
      const response = await api.post("/users/create", data)
      return response.data
    }

    async deleteUsers(data: PayloadDelete) {
      const response = await api.delete("/users/delete", data)
      return response.data
    }

    async editUser(id: string | number, data: ParamsCreateNewUser) {
      const response = await api.put(`/users/edit/${id}`, data)
      return response.data
    }

    async exportExcelUsers(): Promise<DataPagninateUser> {
      const response = await api.get("/users/export-excel", { responseType: "arraybuffer" })
      return response.data
    }
  }
  
  const userAPI = new UserAPI()
  export default userAPI