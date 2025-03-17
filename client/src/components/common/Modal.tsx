import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";


interface ModalProps {
    open: boolean
    closeModal: () => void
    title: string | React.ReactNode
    children: React.ReactNode
    onOk: () => void
    onOkText?: string,
    cancelIcon?: boolean
}
const MyModal = (props: ModalProps) => {
    const { open, closeModal, title, children, onOk, onOkText = "Save", cancelIcon = true } = props

    return (
        <div>

            <Dialog open={open} onClose={closeModal} maxWidth={false} fullWidth
                sx={{ width: "600px", margin: "auto" }}
            >
                <DialogTitle>
                    <div className="border-b pb-1 flex justify-between">
                        <div>{title}</div>
                        {cancelIcon && <IconButton onClick={closeModal} sx={{ ml: "auto" }}>
                            <GridCloseIcon />
                        </IconButton>}
                    </div>

                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onOk} color="primary" variant="contained">
                        {onOkText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyModal;
