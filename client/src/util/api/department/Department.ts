import { SelectItem } from "@/components/common/FormFieldSelect"
import api from "../../api"

class DepartmentAPI {
    async getDepartmentList(): Promise<SelectItem[]> {
      const response = await api.get("/department/getlist")
      return response?.data?.data
    }
  }
  
  const departmentAPI = new DepartmentAPI()
  export default departmentAPI