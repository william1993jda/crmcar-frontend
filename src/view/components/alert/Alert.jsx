import { useSelector, useDispatch } from "react-redux"
import { changeAlert } from "../../../store/actions/alert.action"
import { Modal, Typography, Box } from "@material-ui/core"
import {MdError, MdCheckCircle } from 'react-icons/md'

export default function Alert() {
    // dispara nossa action useDispatch
    const dispatch = useDispatch()
    // pegando o estado do reducer
    const alert = useSelector(state => state.alertReducer)

    return (
        <Modal
            open={alert.open}
            onClose={() => dispatch(changeAlert({open: false}))}
            className={'d-flex flex-column align-items-center justify-content-center h-100'}
        >
            <Box className="bg-white rounded d-flex align-items-center p-4 gap-2">
                
                { alert.class === 'success' && <MdCheckCircle style={{fontSize: '2.5rem'}} className="text-success" /> }
                { alert.class === 'error' && <MdError style={{fontSize: '2.5rem'}} className="text-danger" /> }

                <Typography variant="subtitle2" className="font-weight-bold">
                    {alert.msg}
                </Typography>
            </Box>
        </Modal>
    )
}