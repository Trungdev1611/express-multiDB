import { SelectItem } from "@/components/common/FormFieldSelect"
import api from "../../api"
import { PayloadPaginate } from "../commonType"

class DepartmentAPI {
    async getDepartmentList(paginate?:PayloadPaginate ): Promise<SelectItem[]> {
      const response = await api.getQuery("/department/getlist",paginate)
      return response?.data?.data
    }
  }
  
  const departmentAPI = new DepartmentAPI()
  export default departmentAPI 