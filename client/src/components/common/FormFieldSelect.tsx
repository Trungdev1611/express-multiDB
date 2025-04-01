

import { PayloadPaginate } from "@/util/api/commonType"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"

export interface SelectItem {
    name: string
    id: string | number
}
interface FormFieldSelect {
    options: Array<SelectItem>
    value?: string | number | null | undefined
    className?: string
    label?: string | React.ReactNode
    onChange: (event: SelectChangeEvent<string>) => void;
    placeholder?: string,
    required?: boolean,
    layout?: "horizontal" | "vertical",
    isIntinify?: boolean,
    fetchMoreData?: (paginate: PayloadPaginate) => Promise<SelectItem[]>

}


const FormFieldSelect = (props: FormFieldSelect) => {
    const { options = [], value = "",
        className, label, onChange, placeholder = "Please select an option", required = false, layout = "horizontal",
        isIntinify = false, fetchMoreData } = props
    const menuListRef = useRef<HTMLUListElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [dataOptions, setDataOptions] = useState(options)
    const [paginate, setPaginate] = useState<PayloadPaginate>({page: 1, pageSize: 10})
    const [hasMoreData, setHasMoreData] = useState(true);
    useEffect(() => {
        setDataOptions(options)
    }, [options])
    const handleScroll = async () => {
        if (!isIntinify || !fetchMoreData || loading || !menuListRef.current|| !hasMoreData)  return;
        console.log(`handleScroll`, paginate, )
        const { scrollTop, scrollHeight, clientHeight } = menuListRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) { // Nếu cuộn xuống gần cuối
            setLoading(true);
            const newPage = paginate.page + 1
            setPaginate(prev => ({...prev, page: newPage}))
            const newData = await fetchMoreData(paginate);
            if(!newData || newData.length === 0) {
                //hết dữ liệu
                setLoading(false);
                setHasMoreData(false);
                return
            }
            setLoading(false);
            setDataOptions((prev) => [...prev, ...newData]);
        }
    };

    return (
        <div className={`${layout === "horizontal" ? "items-center" : "flex-col gap-2"} flex gap-4  flex-1`}>
            <span>
                {label && <span className="text-sm inline-block">{label}</span>}
                {label && required && <span className="text-red-400 ml-1">*</span>}
            </span>

            <Select
                displayEmpty
                value={value as string}
                className={`w-full ${className}`}
                sx={{
                    height: '40px',
                    fontSize: '14px',
                }}
                onChange={onChange}
                MenuProps={{
                    PaperProps: {
                        style: { maxHeight: 200, overflowY: "auto" },
                        onScroll: handleScroll,
                        ref: menuListRef,
                    },
                }}
            >

                <MenuItem value="" disabled>
                    {placeholder}
                </MenuItem>
                {dataOptions?.map((item, index) => {
                    return (
                        <MenuItem value={item.id} key={index}>
                            {item.name}
                        </MenuItem>
                    )

                })}
                {loading && <MenuItem disabled>Đang tải...</MenuItem>}
            </Select>
        </div>
    )
}

export default FormFieldSelect
