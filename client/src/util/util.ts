import dayjs from "dayjs"

//api return ra file => cần blob
export async function exportDataExcel(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  name: string = `file-download${dayjs().format("DD_MM_YYYY_HH_mm_ss")}.xlsx`
) {
  try {
    console.log("Type of data:", typeof data)
    console.log("Instance of Response:", data instanceof Response)
    console.log("Instance of Blob:", data instanceof Blob)
    console.log("Instance of ArrayBuffer:", data instanceof ArrayBuffer)
    console.log("Instance of Uint8Array:", data instanceof Uint8Array)
    console.log("Instance of Buffer:", data instanceof Buffer)
    console.log("Constructor name:", data?.constructor?.name)
    

    let blob: Blob
    if (data instanceof Response) {
      blob = await data.blob() // Nếu data là Response từ API, chuyển thành Blob
    } else if (data instanceof Blob) {
      blob = data // Nếu data đã là Blob, sử dụng trực tiếp
    } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
      // Nếu là Buffer (Uint8Array hoặc ArrayBuffer), chuyển thành Blob
      blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    } else {
      throw new Error("Dữ liệu không hợp lệ! Phải là Response hoặc Blob.")
    }

    const url = window.URL.createObjectURL(blob)
    console.log(`url`, url)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Lỗi trong exportDataExcel:", error)
    throw error
  }
}
