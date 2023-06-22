import { CircularProgress, Modal, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { changeLoading } from "../../../store/actions/loading.action";

export default function Loading() {
    // dispara nossa action useDispatch
    const dispatch = useDispatch()
    // pegando o estado do reducer
    const loading = useSelector(state => state.loadingReducer)

    return (
        <Modal 
            open={loading.open}
            onClose={() => dispatch(changeLoading({open: false}))}
            className="d-flex justify-content-center align-items-center h-100"
        >
        <Box className="d-flex gap-3 bg-white p-3 rounded">
            <CircularProgress size={30} />
            <Typography variant="subtitle1">
                {loading.msg}
            </Typography>
        </Box>
        </Modal>
    )
}