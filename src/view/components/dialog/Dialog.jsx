import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@material-ui/core";

export default function Confirm(props) {
    const { open, title, onClose, onConfirm } = props

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
        >
            <DialogTitle disableTypography>
                <Typography variant="subtitle2">
                    {title || 'Tem certeza de que deseja excluir?'}
                </Typography>
                <DialogActions className="d-flex justify-content-center gap-3">
                    <Button onClick={() => onClose()}>
                        Não
                    </Button>
                    <Button onClick={() => {
                            onClose()
                            onConfirm()
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Sim 
                    </Button>
                </DialogActions>
            </DialogTitle>
        </Dialog>
    )
}