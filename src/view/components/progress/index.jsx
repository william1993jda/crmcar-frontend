
import { Modal, CircularProgress } from "@material-ui/core"
import { useState } from "react";

export default function Progress() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={'d-flex flex-column align-items-center justify-content-center h-100'}
        >
                <CircularProgress />
        </Modal>
    )
}