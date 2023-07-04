import { useEffect, useState } from "react"
import Header from "../header"
import { useParams } from "react-router-dom";
import { Box, TextField, CircularProgress, InputAdornment, Select, MenuItem, FormControlLabel, Checkbox } from "@material-ui/core";
import Progress from "../components/progress";
import { store, show, change, cep, brand, model, version } from "../../store/actions/vehicles.action";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";

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

const NumberFormatCustom = (props) => {
    const {inputRef, onChange, ...other} = props

    return (
        <NumberFormat 
            {...other}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }}
            decimalSeparator=","
            thousandSeparator="."
            prefix={other.name}
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
            {(states.isLoading) ? <Progress /> :
                <Box className="container mt-5">
                    <Box className="row">
                        <Box className="col-12">
                            <Box className="d-flex justify-content-center">
                                <Box className={`card-content bg-light mb-3 py-2 px-3 rounded border border-dark-subtle 
                        ${window.innerWidth < 577 || window.innerHeight < 577 ? 'w-100': 'w-50'}`}>
                                    <h3>Localização do veículo</h3>
                                    <Box className="row">
                                        <Box className="col-12">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Cep</label>
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
                                        </Box>

                                        <Box className="col-sm-8 col-md-8 col-lg-10 col-xl-10 col-xxl-10">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">CIDADE</label>
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
                                        </Box>
                                        <Box className="col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Estado</label>
                                                <TextField
                                                    error={data.error.uf && true}
                                                    disabled
                                                    value={data.vehicle.uf}
                                                    variant="outlined"
                                                />
                                                {(data.error.uf) &&
                                                    <strong className="text-danger">{data.error.uf[0]}</strong>
                                                }
                                            </Box>
                                        </Box>
                                        {/*<Box className="col-6">*/}
                                        {/*    <Box className="d-flex flex-column mb-3">*/}
                                        {/*        <label className="label-custom text-uppercase mb-2">Rua</label>*/}
                                        {/*        <TextField */}
                                        {/*            error={data.error.logradouro && true}*/}
                                        {/*            disabled*/}
                                        {/*            value={data.vehicle.logradouro || ''}*/}
                                        {/*            variant="outlined"*/}
                                        {/*        />*/}
                                        {/*        {(data.error.logradouro) && */}
                                        {/*            <strong className="text-danger">{data.error.logradouro[0]}</strong>*/}
                                        {/*        }*/}
                                        {/*    </Box>*/}
                                        {/*</Box>*/}
                                        {/*<Box className="col-6">*/}
                                        {/*    <Box className="d-flex flex-column mb-3">*/}
                                        {/*        <label className="label-custom text-uppercase mb-2">Bairro</label>*/}
                                        {/*        <TextField */}
                                        {/*            error={data.error.bairro && true}*/}
                                        {/*            disabled*/}
                                        {/*            value={data.vehicle.bairro || ''}*/}
                                        {/*            variant="outlined"*/}
                                        {/*        />*/}
                                        {/*        {(data.error.bairro) && */}
                                        {/*            <strong className="text-danger">{data.error.bairro[0]}</strong>*/}
                                        {/*        }*/}
                                        {/*    </Box>*/}
                                        {/*</Box>*/}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="col-12">
                            <Box className="d-flex justify-content-center">
                                <Box className={`card-content bg-light mb-3 py-2 px-3 rounded border border-dark-subtle 
                                    ${window.innerWidth < 577 || window.innerHeight < 577 ? 'w-100': 'w-50'}`}
                                >
                                    <h3>Dados do veículo</h3>
                                    <Box className="row">
                                        <Box className="col-12">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Categoria</label>
                                                <Select
                                                    error={data.error.vehicle_type && true}
                                                    value={data.vehicle.vehicle_type || ''}
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
                                        </Box>

                                        <Box className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom mb-2 text-uppercase">Marcas</label>
                                                <Select
                                                    error={data.error.vehicle_brand && true}
                                                    value={data.vehicle.vehicle_brand || ''}
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
                                        </Box>

                                        <Box className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom mb-2 text-uppercase">Modelos</label>
                                                <Select
                                                    error={data.error.vehicle_model && true}
                                                    value={data.vehicle.vehicle_model || ''}
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
                                        </Box>

                                        <Box className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom mb-2 text-uppercase">Ano do modelo</label>
                                                <Select
                                                    error={data.error.vehicle_regdate && true}
                                                    value={data.vehicle.vehicle_regdate || ''}
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

                                                    {data.regdate?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}

                                                </Select>
                                                {(data.error.vehicle_regdate) &&
                                                    <strong className="text-danger">{data.error.vehicle_regdate[0]}</strong>
                                                }
                                            </Box>
                                        </Box>

                                        <Box className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom mb-2 text-uppercase">Versão</label>
                                                <Select
                                                    error={data.error.vehicle_version && true}
                                                    value={data.vehicle.vehicle_version || ''}
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
                        </Box>


                        {/*Aqui é outra sessão*/}
                        {/*Condição vai mostrar os campos se for*/}
                        {(data.vehicle.vehicle_type === 2020) &&
                        <Box className="col-12">
                            <Box className="d-flex justify-content-center">
                                <Box className={`card-content bg-light mb-3 py-2 px-3 rounded border border-dark-subtle 
                                    ${window.innerWidth < 577 || window.innerHeight < 577 ? 'w-100': 'w-50'}`}
                                >
                                    <Box className="row">
                                        <Box className="col-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Câmbio</label>
                                                <Select
                                                    value={data.vehicle.vehicle_gearbox || ''}
                                                    onChange={e => dispatch(change({vehicle_gearbox: e.target.valeu}))}
                                                    variant="outlined"
                                                >
                                                    {data.gearbox.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Box>

                                        <Box className="col-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Combustível</label>
                                                <Select
                                                    value={data.vehicle.vehicle_fuel || ''}
                                                    onChange={e => dispatch(change({vehicle_fuel: e.target.valeu}))}
                                                    variant="outlined"
                                                >
                                                    {data.fuel.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Box>
                                        <Box className="col-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Direção</label>
                                                <Select
                                                    value={data.vehicle.vehicle_steering || ''}
                                                    onChange={e => dispatch(change({vehicle_steering: e.target.valeu}))}
                                                    variant="outlined"
                                                >
                                                    {data.car_steering.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Box>
                                        <Box className="col-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Potência do motor</label>
                                                <Select
                                                    value={data.vehicle.vehicle_motorpower || ''}
                                                    onChange={e => dispatch(change({vehicle_motorpower: e.target.valeu}))}
                                                    variant="outlined"
                                                >
                                                    {data.motorpower.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Box>
                                        <Box className="col-6">
                                            <Box className="d-flex flex-column mb-3">
                                                <label className="label-custom text-uppercase mb-2">Portas</label>
                                                <Select
                                                    value={data.vehicle.vehicle_doors || ''}
                                                    onChange={e => dispatch(change({vehicle_doors: e.target.valeu}))}
                                                    variant="outlined"
                                                >
                                                    {data.doors.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        }

                        {/* Fim da condição para carros */}

                        {/* Inicio da condição para moto */}
                         {(data.vehicle.vehicle_type === 2060) &&
                            <Box className="col-12">
                                <Box className="d-flex justify-content-center">
                                    <Box className={`card-content bg-light mb-3 py-2 px-3 rounded border border-dark-subtle 
                                        ${window.innerWidth < 577 || window.innerHeight < 577 ? 'w-100': 'w-50'}`}
                                    >
                                        <Box className="row">
                                            <Box className="col-6">
                                                <Box className="d-flex flex-column mb-3">
                                                    <label className="label-custom text-uppercase mb-2">Cilindradas</label>
                                                    <Select
                                                        value={data.vehicle.vehicle_cubiccms || ''}
                                                        onChange={e => dispatch(change({vehicle_cubiccms: e.target.valeu}))}
                                                        variant="outlined"
                                                    >
                                                        {data.cubiccms.map(item => (
                                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Box>
                                            </Box>
                                            <Box className="col-6">
                                                <Box className="d-flex flex-column mb-3">
                                                    <label className="label-custom text-uppercase mb-2">Cor</label>
                                                    <Select
                                                        value={data.vehicle.vehicle_color || ''}
                                                        onChange={e => dispatch(change({vehicle_color: e.target.valeu}))}
                                                        variant="outlined"
                                                    >
                                                        {data.carcolor.map(item => (
                                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </Box>
                                            </Box>
                                            <Box className="col-6">
                                                <Box className="d-flex flex-column mb-3">
                                                    <label className="label-custom text-uppercase mb-2">Quilometragem</label>
                                                    <TextField
                                                        variant="outlined"
                                                        type="tel"
                                                        InputProps={{
                                                            inputComponent: NumberFormatCustom,
                                                            value: data.vehicle.vehicle_mileage || '',
                                                            onChange: text => dispatch(change({vehicle_mileage: text.target.value}))
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        }
                        {/* Fim da condição para moto */}
                        <Box className="col-12">
                                <Box className="d-flex justify-content-center">
                                    <Box className={`card-content bg-light mb-3 py-2 px-3 rounded border border-dark-subtle 
                                        ${window.innerWidth < 577 || window.innerHeight < 577 ? 'w-100': 'w-50'}`}
                                    >
                                        <h3>Dados do veículo</h3>
                                        <Box className="row">
                                            {data.features.map(item => (item.vehicle_type_id === data.vehicle.vehicle_type) && (
                                                <Box className="col-6" key={item.id}>
                                                    <Box className="d-flex flex-column mb-3">
                                                        <FormControlLabel 
                                                            control={
                                                                <Checkbox 
                                                                    checked={data.vehicle.vehicle_features[item.velue] ? true: false}
                                                                    onChange={() => {
                                                                        let checked = data.vehicle.vehicle_features[item.velue]?
                                                                        delete data.vehicle.vehicle_features[item.velue] :
                                                                        {[item.value] : item}
                                                                        dispatch(change({vehicle_features: {
                                                                            ...data.vehicle.vehicle_features,
                                                                            ...checked
                                                                        }}))
                                                                    }}
                                                                />
                                                            }
                                                            label={item.label}
                                                        />
                                                    </Box>
                                                </Box>
                                            ))}
                                            
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                    </Box>
                </Box>
            }
        </>
    )
}
