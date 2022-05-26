import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ProcesoService from '../services/ProcesoService';
import ValuesService from '../services/ValuesService';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, Stack, Grid, Card, CardActionArea, CardContent, Dialog, DialogContent, DialogContentText, DialogActions, Slide, DialogTitle, Alert } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'


import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AuthService from '../services/auth.service';






const AddProcesoComponent = () => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });

    // Dialogo 
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Esto son los desplegables que se muestran, guardamos todos los objetos
    // pero solo mostramos el nombre
    const [dptos, setDptos] = useState([])
    const [cts, setCts] = useState([])
    const [reclus, setReclus] = useState([])
    const [vincus, setVincus] = useState([])
    const [puestos, setPuestos] = useState([])
    const [tcs, setTcs] = useState([])
    const [jls, setJls] = useState([])
    const [titulaciones, setTitulaciones] = useState([])
    const [candidatos, setCandidatos] = useState([])

    var optiones = []


    // Guardamos el id de cada campo para el insert o el update
    const [dpto_id, setDpto_id] = useState('')
    const [ct_id, setCt_id] = useState('')
    const [reclu_id, setReclu_id] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [vinc_id, setVinc_id] = useState('')
    const [puesto_id, setPuesto_id] = useState('')
    const [puestoT, setPuestoT] = useState('')
    const [tc_id, setTc_id] = useState('')
    const [jl_id, setJl_id] = useState('')
    const [requisitos, setRequisitos] = useState('')

    // Los arrays de IDs de titulaciones y candidatos
    const [titu_id, setTitu_id] = useState([])
    const [candi_id, setCandi_id] = useState([])

    const data = [
        {
            "id": "Hombres",
            "label": "Hombres",
            "value": puestoT.hombres,
            "color": "#b8d9ec"
        },
        {
            "id": "Mujeres",
            "label": "Mujeres",
            "value": puestoT.mujeres,
            "color": "#1f1161"
        },

    ];
    let navigate = useNavigate()

    var percentil = Math.trunc((100 * puestoT.mujeres) / (puestoT.hombres + puestoT.mujeres), 3)




    function getValues() {
        ValuesService.getAllDpto().then((response) => {
            setDptos(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllCt().then((response) => {
            setCts(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllReclu().then((response) => {
            setReclus(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllVincus().then((response) => {
            setVincus(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllPuestos().then((response) => {
            setPuestos(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllTc().then((response) => {
            setTcs(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllCt().then((response) => {
            setCts(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllJl().then((response) => {
            setJls(response.data)
        }).catch(error => {
            console.log(error)
        })

        ValuesService.getAllTa().then((response) => {
            setTitulaciones(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    // Función para guardas o actualizar el proceso al dar al botón
    function saveOrUpdateProceso(e) {

        e.preventDefault();

        if (!(dpto_id && ct_id && reclu_id && fechaInicio && fechaFin && vinc_id && puesto_id && jl_id && validForm() && (candi_id.length > 0) && (titu_id.length > 0))) {
            console.log("todont perfe")
            handleClickOpen()
        } else if (dpto_id && ct_id && reclu_id && fechaInicio && fechaFin && vinc_id && puesto_id && jl_id && validForm() && (candi_id.length > 0) && (titu_id.length > 0)) {
            var titulacionesArr = [];
            titu_id.forEach(function (v) {
                titulacionesArr.push({ id: v });
            });

            var candidatosArr = [];
            for (let index = 0; index < candi_id.length; index++) {
                candidatosArr.push(
                    {
                        candidatos: {
                            id: candi_id[index]
                        },
                    }
                );

            }



            if (vinc_id === 1) {
                const procesoLaboral = {
                    "elDepartamento": {
                        "id": dpto_id
                    },
                    "elCentroTrabajo": {
                        "id": ct_id
                    },
                    "elReclutador": {
                        "id": reclu_id
                    },
                    "fechaInicio": fechaInicio,
                    "fechaFin": fechaFin,
                    "laVinculacion": {
                        "id": vinc_id
                    },
                    "elPuesto": {
                        "id": puesto_id
                    },
                    "laContratacion": {
                        "id": tc_id
                    },
                    "laJornada": {
                        "id": jl_id
                    },
                    "lasTitulaciones": titulacionesArr,

                    "procesoCandidatos": candidatosArr,
                    "requisitos": requisitos
                };


                ProcesoService.createProceso(procesoLaboral).then((response) => {
                    window.location.reload(true);

                }).catch(error => { console.log(error); });

            } else {
                const procesoEstudiante = {
                    "elDepartamento": {
                        "id": dpto_id
                    },
                    "elCentroTrabajo": {
                        "id": ct_id
                    },
                    "elReclutador": {
                        "id": reclu_id
                    },
                    "fechaInicio": fechaInicio,
                    "fechaFin": fechaFin,
                    "laVinculacion": {
                        "id": vinc_id
                    },
                    "elPuesto": {
                        "id": puesto_id
                    },
                    "laJornada": {
                        "id": jl_id
                    },
                    "lasTitulaciones": titulacionesArr,
                    "procesoCandidatos": candidatosArr,
                    "requisitos": requisitos
                };

                ProcesoService.createProceso(procesoEstudiante).then((response) => {
                    window.location.reload(true);
                }).catch(error => { console.log(error); });
            }
        }




    }

    function handleInputChange2(event, value) {
        if (value) {
            if (candi_id.includes(value.id)) {
            } else {
                setCandi_id([...candi_id,
                value.id
                ]);
            }
        }
    }

    function getCandis() {
        ValuesService.getAllCandidatos().then((response) => { setCandidatos(response.data) })
    }




    function dateFunction() {
        if (fechaInicio < fechaFin) {
            return true;
        } else {
            return false;
        }
    }

    function validForm() {
        if (vinc_id === 1 && !tc_id) {
            return false;
        } else if (vinc_id === 1 && tc_id > 0) {
            return dateFunction();
        } else if (vinc_id === 2) {
            return dateFunction();
        }

    }

    function deleteCandidato(id_) {
        const temp = [...candi_id];
        const index = candi_id.indexOf(id_);

        if (index > -1) {
            temp.splice(index, 1);
        }

        setCandi_id(temp);
    }

    function tipoc_() {


        if (vinc_id === 1) {
            return <FormControl fullWidth margin='normal'>
                <InputLabel required error={!tc_id} id="demo-simple-select-label">Tipo de contratación: </InputLabel>
                <Select required error={!tc_id} style={{ backgroundColor: 'white' }} onChange={(e) => setTc_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={tc_id}>
                    {tcs.map(
                        tc => <MenuItem divider key={tc.id} value={tc.id}> {tc.nombre}</MenuItem>
                    )}
                </Select>
            </FormControl>;


        } else {
            return;
        }
    }

    function goTo(e) {
        window.location.reload(true);
    }

    function resetButton() {
        setDpto_id('');
        setCt_id('');
        setReclu_id('');
        setFechaInicio(1);
        setFechaFin(1);
        setVinc_id('');
        setPuesto_id('');
        setTc_id('');
        setJl_id('');
        setRequisitos('');
        setCandi_id([]);
        setTitu_id([]);
    }

    function per_mujer() {
        if (percentil > 50) {
            return <h1 style={{ fontSize: "600%", color: "#86dc3d" }}>{percentil}%</h1>

        } else {
            return <h1 style={{ fontSize: "600%", color: "#f20000" }}>{percentil}%</h1>

        }
    }

    function personas_() {
        if (puesto_id) {
            return <div>
                {/* <h3>Mujeres: {puestoT.mujeres}, Hombres: {puestoT.hombres}</h3> */}
                <Grid container spacing={2}>

                    <Grid item xs>
                        <Card >
                            <CardContent style={{ height: 300 }}>
                                <ResponsivePie
                                    data={data}
                                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    activeOuterRadiusOffset={8}
                                    borderWidth={1}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                0.2
                                            ]
                                        ]
                                    }}
                                    colors={{ datum: 'data.color' }}
                                    arcLinkLabelsSkipAngle={10}
                                    arcLinkLabelsTextColor="#333333"
                                    arcLinkLabelsStraightLength={6}
                                    arcLinkLabelsThickness={2}
                                    arcLinkLabelsColor={{ from: 'color' }}
                                    arcLabelsSkipAngle={10}
                                    arcLabelsTextColor={{
                                        from: 'color',
                                        modifiers: [
                                            [
                                                'darker',
                                                2
                                            ]
                                        ]
                                    }}
                                    fill={[
                                        {
                                            match: {
                                                id: 'hombres'
                                            },
                                            id: 'hombres'
                                        },
                                        {
                                            match: {
                                                id: 'mujeres'
                                            },
                                            id: 'mujeres'
                                        }
                                    ]}
                                    legends={[
                                        {
                                            anchor: 'bottom',
                                            direction: 'row',
                                            justify: false,
                                            translateX: 0,
                                            translateY: 56,
                                            itemsSpacing: 0,
                                            itemWidth: 100,
                                            itemHeight: 18,
                                            itemTextColor: '#999',
                                            itemDirection: 'left-to-right',
                                            itemOpacity: 1,
                                            symbolSize: 18,
                                            symbolShape: 'circle',
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemTextColor: '#000'
                                                    }
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs>
                        <Card >
                            <CardContent style={{ height: 300 }}>

                                {
                                    per_mujer()
                                }


                            </CardContent>
                        </Card>
                    </Grid>

                </Grid >
            </div>


        } else {
            return
        }

    }

    function candidatos_() {
        if (candi_id.length > 0) {
            return <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow  >
                                <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>APELLIDO</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>SEXO</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {candidatos.map((candidato) => {
                                if (candi_id.includes(candidato.id))
                                    return <TableRow hover key={candidato.id}>
                                        <TableCell component="th" scope="row">
                                            {candidato.nombre}
                                        </TableCell>
                                        <TableCell>{candidato.apellido1}</TableCell>
                                        <TableCell>{candidato.sexo}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteCandidato(candidato.id)}  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi-trash-fill b-icon bi text-dark" viewBox="0 0 16 16" >
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />

                                                </svg>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </FormControl>
        } else {
            return
        }
    }

    for (let index = 0; index < candidatos.length; index++) {
        optiones.push({
            label: ((candidatos[index].nombre) + " " + (candidatos[index].apellido1) + ", " + (candidatos[index].sexo)),
            id: candidatos[index].id
        })

    }

    var enabled = dpto_id && ct_id && reclu_id && fechaInicio && fechaFin && vinc_id && puesto_id && jl_id && validForm() && (candi_id.length > 0) && (titu_id.length > 0);

    // Same as component did mount
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate("/login")
        }
        getValues()
    }, [])


    useEffect(() => {
        ValuesService.getAllCandidatos().then((response) => {
            setCandidatos(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [candi_id])

    useEffect(() => {

        ValuesService.getPuestoById(puesto_id).then((response) => {
            setPuestoT(response.data)
        }).catch(error => {
            console.log(error)
        })

    }, [puesto_id])

    useEffect(() => {
        setMessage("")
        if (fechaInicio > fechaFin) {
            setMessage("ERROR FECHA INICIO DEBE SER MENOR QUE FECHA FIN")
        }
    }, [fechaFin, fechaInicio])



    return (
        <React.Fragment>
            <div>
                <div>
                    <Container component="main" maxWidth="md" sx={{ mb: 8 }}>
                        <Paper style={{ backgroundColor: '#f8f9fa' }} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                            <form>
                                <div >

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }} >
                                        <InputLabel required error={!dpto_id} id="demo-simple-select-label">Departamento</InputLabel>
                                        <Select required error={!dpto_id} labelId="demo-simple-select-label" id="demo-simple-select" label="Departamento" onChange={(e) => { setDpto_id(e.target.value) }} value={dpto_id} >
                                            {dptos.map(
                                                dpto => <MenuItem divider key={dpto.id} value={dpto.id}>{dpto.nombre}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={!ct_id} id="demo-simple-select-label">Centro de trabajo: </InputLabel>
                                        <Select required error={!ct_id} onChange={(e) => { setCt_id(e.target.value) }} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={ct_id}  >
                                            {cts.map(
                                                ct => <MenuItem divider key={ct.id} value={ct.id}> {ct.nombre}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={!reclu_id} id="demo-simple-select-label">Reclutador: </InputLabel>
                                        <Select required error={!reclu_id} onChange={(e) => { setReclu_id(e.target.value) }} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={reclu_id}>
                                            {reclus.map(reclu => {
                                                if (reclu.roles[0].name == "ROLE_USER")
                                                    return <MenuItem divider key={reclu.id} value={reclu.id} > {reclu.nombre}, {reclu.apellidos}</MenuItem>
                                            }
                                            )}
                                        </Select>
                                    </FormControl>

                                    <FormControl >
                                        <LocalizationProvider dateAdapter={AdapterDateFns} dateFormat>
                                            <Stack spacing={8} direction="row" >

                                                < DatePicker
                                                    inputFormat="dd/MM/yyyy"
                                                    label="Fecha Inicio"
                                                    views={['year', 'month', 'day']}
                                                    value={fechaInicio}
                                                    onChange={(e) => { setFechaInicio(e); }}
                                                    renderInput={(params) => <TextField  {...params} style={{ backgroundColor: 'white' }} />}
                                                />

                                                <DatePicker
                                                    label="Fecha Fin"
                                                    inputFormat="dd/MM/yyyy"
                                                    views={['year', 'month', 'day']}
                                                    value={fechaFin}
                                                    onChange={(e) => { setFechaFin(e); }}
                                                    renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </FormControl>

                                    {message && <Alert sx={{ mt: 2 }} severity='error'> {message}</Alert>}

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={titu_id.length < 1} id="demo-simple-select-label">Titulaciones: </InputLabel>
                                        <Select required error={titu_id.length < 1} multiple onChange={(e) => { setTitu_id(e.target.value); }} label="Titulaciones" value={titu_id}>
                                            {titulaciones.map(
                                                titu => <MenuItem divider key={titu.id} value={titu.id} > {titu.nombre}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>


                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={!vinc_id} id="demo-simple-select-label" >Vinculacion: </InputLabel>
                                        <Select required error={!vinc_id} onChange={(e) => { setVinc_id(e.target.value) }} label="Vinculacion" value={vinc_id} >
                                            {vincus.map(
                                                vincu => <MenuItem divider key={vincu.id} value={vincu.id} > {vincu.nombre}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    {
                                        tipoc_()
                                    }

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={!puesto_id} id="demo-simple-select-label">Puesto: </InputLabel>
                                        <Select required error={!puesto_id} onChange={(e) => { setPuesto_id(e.target.value) }} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={puesto_id}>
                                            {puestos.map(
                                                puesto => <MenuItem divider key={puesto.id} value={puesto.id} > {puesto.nombre}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>


                                    {
                                        personas_()
                                    }

                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <InputLabel required error={!jl_id} id="demo-simple-select-label">Jornada Laboral: </InputLabel>
                                        <Select required error={!jl_id} onChange={(e) => setJl_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={jl_id} >
                                            {jls.map(
                                                jl => <MenuItem divider key={jl.id} value={jl.id} > {jl.nombre}, {jl.horaSemanal} H/S</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                        <TextField id="outlined-basic" label="Requisitos" variant="outlined" onChange={(e) => setRequisitos(e.target.value)} />

                                    </FormControl>

                                </div>



                                <h3> Candidatos</h3>

                                <FormControl required error={candi_id.length < 1} fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                    <Autocomplete

                                        disablePortal
                                        id="combo-box-demo"
                                        options={optiones}
                                        onChange={handleInputChange2}


                                        renderInput={(params) => <TextField {...params} error={candi_id.length < 1} label="Candidatos:" />} />
                                </FormControl>

                                {
                                    candidatos_()
                                }

                                <Button
                                    href='#'
                                    onClick={(e) => saveOrUpdateProceso(e)}
                                    variant='contained'
                                    color='success'
                                    style={{ marginTop: "10px" }}
                                    disabled={!enabled}
                                >
                                    SAVE
                                </Button>
                                <Button variant='contained' style={{ marginTop: "10px", marginLeft: "10px" }} onClick={resetButton}> RESET</Button>
                                <Button onClick={(e) => goTo()} variant='contained' color='error' style={{ marginLeft: "10px", marginTop: "10px" }}> CANCEL</Button>
                            </form>
                        </Paper>
                    </Container>

                </div>
            </div >

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>ERROR</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ha habido un error en la autenticación de datos
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCELAR</Button>
                    <Button onClick={handleClose}>ACEPTAR</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddProcesoComponent;