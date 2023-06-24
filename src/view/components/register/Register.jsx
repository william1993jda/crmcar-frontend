import { Box, Button, TextField, Typography, withStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { changeRegister, register } from "../../../store/actions/register.action";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
const dispatch = useDispatch();
const { user, error, success } = useSelector(state => state.registerReducer)

  return (
    <Box className="d-flex bg-white min-vh-100">
        <Box className="container mt-5">
            <Box className="row d-flex justify-content-center">
                <Box className="col-md-4">
                    <Box className="form-group d-flex flex-column text-center gap-3">
                        <img height="48" src="/logo.png" alt="" />
                        <Typography component="title" variant="h6">
                            Crie sua conta, teste grátis!
                        </Typography>

                        <Box className="d-flex flex-column">
                            <TextField 
                                error={(error.name) && true}
                                label="Nome"
                                variant="outlined"
                                value={user.name}
                                onChange={text => {
                                    dispatch(changeRegister({name: text.target.value}))
                                    if(error.name && delete error.name);
                                }}
                            />
                            {(error.name) && <strong className="text-danger text-start">{error.name[0]}</strong>}
                        </Box>

                        <Box className="d-flex flex-column">
                            <TextField 
                                error={(error.name) && true}
                                label="E-mail"
                                variant="outlined"
                                value={user.email}
                                type="email"
                                autoComplete="email"
                                onChange={text => {
                                    dispatch(changeRegister({email: text.target.value}))
                                    if(error.email && delete error.email);
                                }}
                            />
                            {(error.email) && <strong className="text-danger text-start">{error.email[0]}</strong>}
                        </Box>

                        <Box className="d-flex flex-column">
                            <TextField
                                error={(error.name) && true}
                                label="Senha"
                                variant="outlined"
                                value={user.password}
                                type="password"
                                onChange={text => {
                                    dispatch(changeRegister({password: text.target.value}))
                                    if(error.password && delete error.password);
                                }}
                            />
                            {(error.password) && <strong className="text-danger text-start">{error.password[0]}</strong>}
                        </Box>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={() => dispatch(register(user))}
                        >
                            Cadastrar
                        </Button>

                        <Box className="text-center">
                            <Link to='/login'>
                                Fazer login
                            </Link>
                        </Box>
                        {success && <Navigate to="/vehicles" />}
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
