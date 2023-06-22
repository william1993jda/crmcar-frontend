
import { Modal, CircularProgress } from "@material-ui/core"

export default function Progress() {
    return (
        <Modal
            open={true}
            onClose={{open: false}}
            className={'d-flex flex-column align-items-center justify-content-center h-100'}
        >
                <CircularProgress />
        </Modal>
    )
}