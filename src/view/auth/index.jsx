import { TextField, Typography, Box, Button, withStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { changeOauth, login } from "../../store/actions/oauth.action";
import { Navigate, Link } from 'react-router-dom';

const RegisterButton = withStyles({
    root: {
        color: '#fff',
        backgroundColor: '#28a745',
        '&:hover': {
            backgroundColor: '#218828',
        }
    }
})(Button)

export default function Auth() {
    const dispatch = useDispatch();
    const {credentials, success} = useSelector(state => state.oauthReducer)
    
  return (
    <Box className='d-flex bg-white min-vh-100'>
        <Box className='container mt-5'>
            <Box className='row justify-content-center'>
                <Box className='col-md-4'>
                    <Box className="form-group text-center">
                        <img src="./logo.png" alt="car crm" height="48" />
                        <Typography variant="h6" component="h1" className="mt-3">
                            Plataforma para revenda de veículos
                        </Typography>
                    </Box>
                    <Box className="d-flex flex-column gap-3">
                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={credentials.email}
                            onChange={text => dispatch(changeOauth({email: text.target.value}))}
                            variant="outlined"
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            autoComplete="password"
                            value={credentials.password}
                            onChange={text => dispatch(changeOauth({password: text.target.value}))}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={() => dispatch(login(credentials))}
                        >
                            Entrar
                        </Button>

                        <RegisterButton
                            component={Link}
                            to='/register'
                            variant="contained"
                            fullWidth
                            size="large"
                        >
                            Cadastrar
                        </RegisterButton>
                        {success && <Navigate to="/vehicles" />}
                    </Box>
                    <Link to='/vehicles/create'>Acessar o teste</Link>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
