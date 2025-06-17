// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportExcelClient(data: any) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx'); 
        document.body.appendChild(link);
        link.click();
      
}