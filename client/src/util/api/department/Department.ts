import { SelectItem } from "@/components/common/FormFieldSelect"
import api from "../../api"
import { PayloadPaginate } from "../commonType"
import { DepartmentPaginate } from "./type"

class DepartmentAPI {
    async getDepartmentList(paginate?:PayloadPaginate ): Promise<SelectItem[]> {
      const response = await api.getQuery("/department/getlist",paginate)
      return response?.data?.data
    }

    async getDepartmentListTable(paginate?:PayloadPaginate ): Promise<DepartmentPaginate> {
      const response = await api.getQuery("/department/getdeparts",paginate)
      return response?.data
    }
  }
  
  const departmentAPI = new DepartmentAPI()
  export default departmentAPI 