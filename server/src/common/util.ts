import * as ExcelJS from 'exceljs';
import { Response } from 'express';

type DataColType = {
    header: string,
    key: string,
    width: number
}

export async function exportExcelData(response: Response, data: any[], dataColumn: Array<DataColType> = []) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

    // Thêm header
  worksheet.columns = dataColumn.map(item => {
    return {header: item.header, key: item.key, width: item.width}
  })



  // Thêm dữ liệu
  data.forEach(item => {
    worksheet.addRow(item);
  });

  // Xuất ra response
  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  response.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

  await workbook.xlsx.write(response);
  response.end();
}