import dayjs from "dayjs"

//api return ra file => cần blob
export type FileApiDownload =  string | Response | Blob | ArrayBuffer | Uint8Array
export async function exportDataFile(
  data: FileApiDownload,
  type: "csv" | "xlsx" = "xlsx",
  name: string = `file-download${dayjs().format("DD_MM_YYYY_HH_mm_ss")}`,
) {
  try {
    console.log("Type of data:", typeof data)
    console.log("Instance of Response:", data instanceof Response)
    console.log("Instance of Blob:", data instanceof Blob)
    console.log("Instance of ArrayBuffer:", data instanceof ArrayBuffer)
    console.log("Instance of Uint8Array:", data instanceof Uint8Array)
    console.log("Instance of Buffer:", data instanceof Buffer)
    console.log("Constructor name:", data?.constructor?.name)

    const mimeType =
      type === "xlsx"
        ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        : "text/csv; charset=UTF-8"

    const fileName = `${name}.${type}` // Thêm phần mở rộng phù hợp

    let blob: Blob
    if (data instanceof Response) {
      blob = await data.blob() // Nếu data là Response từ API, chuyển thành Blob
    } else if (data instanceof Blob) {
      blob = data // Nếu data đã là Blob, sử dụng trực tiếp
    } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
      // Nếu là Buffer (Uint8Array hoặc ArrayBuffer), chuyển thành Blob
      blob = new Blob([data], { type: mimeType })
    } else if (typeof data === "string") {
      // Nếu data là chuỗi CSV, chuyển thành Blob
      blob = new Blob([type === "csv" ? `\uFEFF${data}` : data], { type: mimeType }) // \uFEFF để hỗ trợ UTF-8 (tiếng Việt)
    } else {
      throw new Error("Dữ liệu không hợp lệ! Phải là Response, Blob, Buffer hoặc chuỗi CSV.")
    }

    const url = window.URL.createObjectURL(blob)
    console.log(`url`, url)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Lỗi trong exportDataFile:", error)
    throw error
  }
}
