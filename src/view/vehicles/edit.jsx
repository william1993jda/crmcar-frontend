import { useEffect, useState } from "react"
import Header from "../header"
import { useParams } from "react-router-dom";
import { Box, TextField, CircularProgress, InputAdornment, Select, MenuItem } from "@material-ui/core";
import Progress from "../components/progress";
import { store, show, change, cep, brand, model, version } from "../../store/actions/vehicles.action";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props

    let mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]

    return (
        <MaskedInput 
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={mask}
            guide={false}
        />
    )
}


export default function VehicleEdit() {
    const paramId = useParams();
    const dispatch = useDispatch()
    const data = useSelector(state => state.vehiclesReducer)

    const [states, setStates] = useState({
        isLoading: true,
        isLoadingCep: false,
        isDeleted: null,
        redirect: false,
        tips: 0,
        confirmEl: null,
        vehicle_id: paramId.id ? paramId.id : null
    })

    useEffect(() => {
        const index = () => {
            if(states.vehicle_id) {
                dispatch(show(states.vehicle_id))
                .then(res => {
                    if(res) {
                        setStates({isLoading: false})
                    }
                }).catch(error => console.error(error))
            } else {
                dispatch(store())
                .then( res => {
                    if(res) {
                        setStates({isLoading: false})
                    }
                })
            }
        }

        index()
    }, [])

  return (
    <>
        <Header title="Veículos - gestão"/>
        <Box className="container mt-4 pt-3">
            {(states.isLoading) ? <Progress /> : 
                <Box className="row">
                    <Box className="col-6 mb-4">
                        <h3>Localização do veículo</h3>
                        <Box className="card card-body">
                            <Box className="row">
                                <Box className="col-md-7 d-flex flex-column form-row">
                                    <label className="label-custom mb-2 text-uppercase">Cep</label>
                                    <TextField
                                        style={(states.isLoadingCep) ? {opacity: 0.5}: {}}
                                        error={data.error.zipCode && true}
                                        variant="outlined"
                                        type="tel"
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                            value: data.vehicle.zipCode,
                                            onChange: text => {
                                                dispatch(change({zipCode: text.target.value}))
                                                if(text.target.value.length > 8) {
                                                    setStates({isLoadingCep: true})
                                                    dispatch(cep(text.target.value))
                                                    .then(res => res && setStates({isLoadingCep: false}))
                                                    if(data.error.zipCode) {
                                                        delete data.error.zipCode
                                                        delete data.error.uf
                                                        delete data.error.city
                                                        delete data.error.logradouro
                                                        delete data.error.bairro
                                                    }
                                                }
                                            },
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    {(states.isLoadingCep) ? 
                                                        <CircularProgress size={32} /> : <></>
                                                    }
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    {(data.error.zipCode) && 
                                        <strong className="text-danger">{data.error.zipCode[0]}</strong>
                                    }
                                </Box>
                                <Box className="col-md-7 d-flex flex-column form-row my-3">
                                    <label className="label-custom mb-2 text-uppercase">CIDADE</label>
                                    <TextField 
                                        error={data.error.city && true}
                                        disabled
                                        value={data.vehicle.city || ''}
                                        variant="outlined"
                                    />
                                        {(data.error.city) && 
                                        <strong className="text-danger">{data.error.city[0]}</strong>
                                    }
                                </Box>
                                <Box className="col-md-5 d-flex flex-column form-row my-3">
                                    <label className="label-custom mb-2 text-uppercase">Estado</label>
                                    <TextField 
                                        error={data.error.uf && true}
                                        disabled
                                        value={data.vehicle.uf}
                                        variant="outlined"
                                    />
                                </Box>
                                <Box className="col-md-7 d-flex flex-column form-row">
                                    <label className="label-custom mb-2 text-uppercase">Rua</label>
                                    <TextField 
                                        error={data.error.logradouro && true}
                                        disabled
                                        value={data.vehicle.logradouro || ''}
                                        variant="outlined"
                                    />
                                    {(data.error.logradouro) && 
                                        <strong className="text-danger">{data.error.logradouro[0]}</strong>
                                    }
                                </Box>
                                <Box className="col-md-5 d-flex flex-column form-row">
                                    <label className="label-custom mb-2 text-uppercase">Bairro</label>
                                    <TextField 
                                        error={data.error.bairro && true}
                                        disabled
                                        value={data.vehicle.bairro || ''}
                                        variant="outlined"
                                    />
                                    {(data.error.bairro) && 
                                        <strong className="text-danger">{data.error.bairro[0]}</strong>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    
                    
                    <Box className="col-6 mb-4">
                        <h3>Dados do veículo</h3>
                        <Box className="card card-body">
                            <Box className="row">
                                <Box className="col-md-12 d-flex flex-column form-row">
                                    <label className="label-custom mb-2 text-uppercase">Categoria</label>
                                    <Select
                                        error={data.error.vehicle_type && true}
                                        value={data.vehicle.vehicle_type || 0}
                                        variant="outlined"
                                        onChange={e => {
                                            dispatch(change({
                                                vehicle_type: e.target.value, 
                                                vehicle_brand: null, 
                                                vehicle_model: null,
                                                vehicle_version: null,
                                                vehicle_gearbox: null,  
                                                vehicle_fuel: null,
                                                vehicle_steering: null,
                                                vehicle_motorpower: null,
                                                vehicle_doors: null,
                                            }))

                                            dispatch(brand(e.target.value))
                                            if(data.error.vehicle_type) {
                                                delete data.error.vehicle_type
                                            }
                                        }}
                                    >
                                    
                                    {data.vehicle_types.map(item => (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    ))}

                                    </Select>
                                    {(data.error.vehicle_type) && 
                                        <strong className="text-danger">{data.error.vehicle_type[0]}</strong>
                                    }
                                </Box>

                                <Box className="col-md-4 d-flex flex-column form-row my-3">
                                    <label className="label-custom mb-2 text-uppercase">Marcas</label>
                                    <Select
                                        error={data.error.vehicle_brand && true}
                                        value={data.vehicle.vehicle_brand || 0}
                                        variant="outlined"
                                        onChange={e => {
                                            dispatch(change({
                                                vehicle_brand: e.target.value,
                                                vehicle_model: null,
                                                vehicle_version: null,
                                            }))

                                            dispatch(model(data.vehicle.vehicle_type, e.target.value))
                                            if(data.error.vehicle_brand) {
                                                delete data.error.vehicle_brand
                                            }
                                        }}
                                    >
                                    
                                    {data.vehicle_brand.map(item => (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    ))}

                                    </Select>
                                    {(data.error.vehicle_brand) && 
                                        <strong className="text-danger">{data.error.vehicle_brand[0]}</strong>
                                    }
                                </Box>


                                <Box className="col-4 d-flex flex-column form-row my-3">
                                    <label className="label-custom mb-2 text-uppercase">Modelos</label>
                                    <Select
                                        error={data.error.vehicle_model && true}
                                        value={data.vehicle.vehicle_model || 0}
                                        variant="outlined"
                                        onChange={e => {
                                            dispatch(change({
                                                vehicle_model: e.target.value,
                                                vehicle_version: null,
                                            }))

                                            dispatch(version(data.vehicle.vehicle_brand, e.target.value))
                                            if(data.error.vehicle_model) {
                                                delete data.error.vehicle_model
                                            }
                                        }}
                                    >
                                    
                                    {data.vehicle_model.map(item => (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    ))}

                                    </Select>

                                    {(data.error.vehicle_model) && 
                                        <strong className="text-danger">{data.error.vehicle_model[0]}</strong>
                                    }
                                </Box>
                                
                                <Box className="col-4 d-flex flex-column form-row mt-3">
                                    <label className="label-custom mb-2 text-uppercase">Ano do modelo</label>
                                    <Select
                                        error={data.error.vehicle_regdate && true}
                                        value={data.vehicle.vehicle_regdate || 0}
                                        variant="outlined"
                                        onChange={e => {
                                            dispatch(change({
                                                vehicle_regdate: e.target.value
                                            }))

                                            if(data.error.vehicle_regdate) {
                                                delete data.error.vehicle_regdate
                                            }
                                        }}
                                    >
                                    
                                    {data.regdate.map(item => (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    ))}

                                    </Select>
                                    {(data.error.vehicle_regdate) && 
                                        <strong className="text-danger">{data.error.vehicle_regdate[0]}</strong>
                                    }
                                </Box>
                                <Box className="col-4 d-flex flex-column form-row mt-3">
                                    <label className="label-custom mb-2 text-uppercase">Versão</label>
                                    <Select
                                        error={data.error.vehicle_version && true}
                                        value={data.vehicle.vehicle_version || 0}
                                        variant="outlined"
                                        onChange={e => {
                                            dispatch(change({
                                                vehicle_version: e.target.value
                                            }))

                                            if(data.error.vehicle_version) {
                                                delete data.error.vehicle_version
                                            }
                                        }}
                                    >
                                    
                                    {data.vehicle_version.map(item => (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    ))}

                                    </Select>
                                    {(data.error.vehicle_version) && 
                                        <strong className="text-danger">{data.error.vehicle_version[0]}</strong>
                                    }
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    </>
  )
}
