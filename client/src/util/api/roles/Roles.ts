import { SelectItem } from "@/components/common/FormFieldSelect"
import api from "../../api"

class Roles {
    async roleList(): Promise<SelectItem[]> {
      const response = await api.get("/role/getlist")
      return response.data
    }
  }
  
  const roleAPI = new Roles()
  export default roleAPI