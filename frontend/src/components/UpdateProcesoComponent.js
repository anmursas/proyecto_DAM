import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import ProcesoService from '../services/ProcesoService';
import ValuesService from '../services/ValuesService';
import { FormControl, InputLabel, Select, MenuItem, Button, Container, Stack, Autocomplete, TableCell, TableBody, TableRow, Table, TableHead, Dialog, DialogTitle, DialogContent, DialogContentText, RadioGroup, FormControlLabel, DialogActions, Radio, TableContainer, Grid, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ResponsivePie } from '@nivo/pie'
import AuthService from '../services/auth.service';


const UpdateProcesoComponent = () => {

    // ID que le pasamos
    const { id } = useParams();

    // Candidatos 
    const [entrevistado, setEntrevistado] = useState()
    const [motivo, setMotivo] = useState("")
    const [fEntrevista, setfEntrevista] = useState(0)

    // Variables
    const [open, setOpen] = useState(false);
    const [open_1, setOpen_1] = useState(false);
    const [candidatoUpdate, setCandidatoUpdate] = useState();
    const [admin, setAdmin] = useState(false)
    const [messageError, setMessageError] = useState("");
    const [userValid, setUserValid] = useState(true);

    // Values
    const [dptos, setDptos] = useState([])
    const [cts, setCts] = useState([])
    const [reclus, setReclus] = useState([])
    const [vincus, setVincus] = useState([])
    const [puestos, setPuestos] = useState([])
    const [tcs, setTcs] = useState([])
    const [jls, setJls] = useState([])
    const [titulaciones, setTitulaciones] = useState([])
    const [candidatos, setCandidatos] = useState([])
    const [candis, setCandis] = useState([]);

    // Input values
    const [dpto_id, setDpto_id] = useState(0)
    const [ct_id, setCt_id] = useState(0)
    const [reclu_id, setReclu_id] = useState("")
    const [fechaInicio, setFechaInicio] = useState(0)
    const [fechaFin, setFechaFin] = useState(0)
    const [vinc_id, setVinc_id] = useState(0)
    const [puesto_id, setPuesto_id] = useState('')
    const [puestoT, setPuestoT] = useState('')
    const [tc_id, setTc_id] = useState(0)
    const [jl_id, setJl_id] = useState(0)
    const [requisitos, setRequisitos] = useState('')

    // Los arrays de IDs de titulaciones y candidatos
    const [titu_id, setTitu_id] = useState([])
    const [candi_id, setCandi_id] = useState([])

    // Para mostrar el gráfico
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



    // Calcular porcentaje mujeres
    var percentil = Math.trunc((100 * puestoT.mujeres) / (puestoT.hombres + puestoT.mujeres), 3)

    var navigate = useNavigate()

    // Rellenar autocompletable
    var optiones = []
    if (userValid) {
        for (let index = 0; index < candidatos.length; index++) {
            optiones.push({
                label: ((candidatos[index].nombre) + " " + (candidatos[index].apellido1) + ", " + (candidatos[index].sexo)),
                id: candidatos[index].id
            })

        }
    }


    // Comprobar si todos los parámetros están rellenadoso
    var enabled = dpto_id && ct_id && reclu_id && fechaInicio && fechaFin && vinc_id && puesto_id && jl_id && validForm() && candi_id && titu_id;

    // Comprueba si la fecha inicio es menor que la fecha fin
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

    function handleInputChange2(event, value) {
        if (userValid) {
            if (value) {
                if (candi_id.includes(value.id)) {
                } else {
                    setCandi_id([...candi_id,
                    value.id
                    ]);

                    var procand = {
                        "proceso": {
                            "id": id
                        },
                        "candidatos": {
                            "id": value.id
                        },
                        "entrevistado": "NO_ENTREVISTADO"

                    }

                    ValuesService.postProcesoCandidato(procand).then((response) => {
                    }).catch(error => {
                        setOpen_1(true)
                        console.log(error)
                    })
                }
            }
        } else {

        }

    }

    function handleClose(e) {
        setOpen(false);
        setOpen_1(false);
    }

    function editCandi(id) {

        ValuesService.getProcesoCandidatobyId(id).then((response) => {
            setEntrevistado(response.data.entrevistado)
            setfEntrevista(response.data.fechaE)
            if (response.data.motivo == null) {
                setMotivo("")
            } else {
                setMotivo(response.data.motivo)
            }

        }).catch(error => {
            console.log(error)
        })

        setOpen(true);
        setCandidatoUpdate(id)
    }

    function updateCandi() {
        if (userValid) {
            const pro_candi = {
                "entrevistado": entrevistado,
                "motivo": motivo,
                "fechaE": fEntrevista
            };

            ValuesService.putProcesoCandidato(candidatoUpdate, pro_candi).then((response) => {
            }).catch(error => {
                setOpen_1(true)
                console.log(error)
            })

            setOpen(false);
        } else {

        }



    }

    function deleteCandidato(id_, procand_id) {
        if (id) {
            const temp = [...candi_id];
            const index = candi_id.indexOf(id_);

            if (index > -1) {
                temp.splice(index, 1);
            }

            setCandi_id(temp);

            ValuesService.deleteProcesoCandidato(procand_id).then((response) => {
            }).catch(error => {
                setOpen_1(true)
                console.log(error)
            })

            ValuesService.getProcesoCandidato().then((response) => {
                setCandis(response.data)
            }).catch(error => {
                setOpen_1(true)
                console.log(error)
            })


        } else {
            const temp = [...candi_id];
            const index = candi_id.indexOf(id_);

            if (index > -1) {
                temp.splice(index, 1);
            }

            setCandi_id(temp);
        }






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

    // Esta funcion rellena las variables con los campos de la base de datos, para los desplegables
    function getValues() {
        ValuesService.getAllDpto().then((response) => {
            setDptos(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllCt().then((response) => {
            setCts(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllReclu().then((response) => {
            setReclus(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllVincus().then((response) => {
            setVincus(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllPuestos().then((response) => {
            setPuestos(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllTc().then((response) => {
            setTcs(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllCt().then((response) => {
            setCts(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllJl().then((response) => {
            setJls(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getProcesoCandidato().then((response) => {
            setCandis(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllCandidatos().then((response) => {
            setCandidatos(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

        ValuesService.getAllTa().then((response) => {
            setTitulaciones(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })
    }

    function tipoc_() {

        if (vinc_id === 1) {
            return <FormControl fullWidth margin='normal'>
                <InputLabel id="demo-simple-select-label">Tipo de contratación: </InputLabel>
                <Select disabled={!admin} style={{ backgroundColor: 'white' }} onChange={(e) => setTc_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={tc_id}>
                    {tcs.map(
                        tc => <MenuItem divider key={tc.id} value={tc.id}> {tc.nombre}</MenuItem>
                    )}
                </Select>
            </FormControl>;


        } else {
            return;
        }
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
            return <Grid container spacing={2}>
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


        } else {
            return
        }

    }

    function updateProceso(e) {
        if (!userValid) {
        } else {
            e.preventDefault();

            var titulacionesArr = [];
            titu_id.forEach(function (v) {
                titulacionesArr.push({ id: v });
            });

            var candidatosArr = [];
            for (let index = 0; index < candi_id.length; index++) {
                candidatosArr.push({
                    candidatos: {
                        id: candi_id[index]
                    }
                });

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

                ProcesoService.updateProceso(id, procesoLaboral).then((response) => {
                    navigate('/')
                }).catch(error => {
                    setOpen_1(true)
                    console.log(error);
                });
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


                ProcesoService.updateProceso(id, procesoEstudiante).then((response) => {
                    navigate('/')
                }).catch(error => {
                    setOpen_1(true)
                    console.log(error);
                });
            }
        }

    }



    useEffect(() => {
        var admin = 0
        const user = AuthService.getCurrentUser();

        // Comprobamos is hay usuario, si no hay redirigimos a la ventana de login
        if (!user) {
            navigate("/login")
        } else {
            // Si hay usuario, guardamos si es administrador o no
            ValuesService.isAdmin().then((response) => {
                admin = response.data
                setAdmin(admin);
            })
        }


        // Con esto guardamos todos los datos del proceso seleccionado
        ProcesoService.getProcesoById(id).then((response) => {
            var titus_id = []
            var candis_id = []

            setDpto_id(response.data.elDepartamento.id)
            setCt_id(response.data.elCentroTrabajo.id)
            setReclu_id(response.data.elReclutador.id)
            setFechaInicio(response.data.fechaInicio)
            setFechaFin(response.data.fechaFin)
            setVinc_id(response.data.laVinculacion.id)
            setPuesto_id(response.data.elPuesto.id)
            setJl_id(response.data.laJornada.id)
            setRequisitos(response.data.requisitos)

            // Para rellenar el tipo de contratación
            if (response.data.laContratacion !== null) {
                setTc_id(response.data.laContratacion.id)
            }

            // Las titulaciones están en un array, lo recorremos para guardar el id
            for (let index = 0; index < response.data.lasTitulaciones.length; index++) {
                titus_id.push(response.data.lasTitulaciones[index].id)
            }
            setTitu_id(titus_id)

            // Lo mismo para los candidatos
            for (let index = 0; index < response.data.procesoCandidatos.length; index++) {
                candis_id.push(response.data.procesoCandidatos[index].candidatos.id)
            }
            setCandi_id(candis_id)

        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })





        getValues()
    }, [])

    useEffect(() => {
        ValuesService.getProcesoCandidato().then((response) => {
            setCandis(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })

    }, [open])

    useEffect(() => {
        candi_id.forEach(element => {
            ValuesService.getCandidatoById(element).then((response) => {
            })
        });



        ValuesService.getProcesoCandidato().then((response) => {
            setCandis(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })
    }, [candi_id])

    useEffect(() => {
        ValuesService.getPuestoById(puesto_id).then((response) => {
            setPuestoT(response.data)
        }).catch(error => {
            setOpen_1(true)
            console.log(error)
        })
    }, [puesto_id])


    useEffect(() => {
        setMessageError("")
        if (fechaInicio > fechaFin) {
            setMessageError("ERROR FECHA INICIO DEBE SER MENOR QUE FECHA FIN")
        }
    }, [fechaFin, fechaInicio])

    useEffect(() => {

        ValuesService.getIdFromToken().then((response) => {
            ProcesoService.getProcesoById(id).then((response1) => {
                ValuesService.isAdmin().then((response2) => {
                    if (response.data === response1.data.elReclutador.id) {
                    } else {
                        if (response2.data) {
                        } else {
                            setOpen_1(true)
                            setUserValid(false)
                            resetButton()
                            optiones = [0]
                            navigate("/")
                        }
                    }
                })

            })
        })
    }, [reclu_id])



    return (
        <div>
            <h2>Actualizar proceso de selección</h2>
            <Container component="main" maxWidth="md" sx={{ mb: 8 }}>
                <Paper style={{ backgroundColor: '#f8f9fa' }} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <form>
                        <div>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                                <Select disabled={!admin} labelId="demo-simple-select-label" id="demo-simple-select" label="Departamento" onChange={(e) => setDpto_id(e.target.value)} value={dpto_id} >
                                    {dptos.map(
                                        dpto => <MenuItem divider key={dpto.id} value={dpto.id}>{dpto.nombre}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Centro de trabajo: </InputLabel>
                                <Select disabled={!admin} onChange={(e) => setCt_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={ct_id}  >
                                    {cts.map(
                                        ct => <MenuItem divider key={ct.id} value={ct.id}> {ct.nombre}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Reclutador: </InputLabel>
                                <Select disabled={!admin} onChange={(e) => setReclu_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={reclu_id}>
                                    {reclus.map(reclu => {
                                        if (reclu.roles[0].name === "ROLE_USER")
                                            return <MenuItem divider key={reclu.id} value={reclu.id} > {reclu.apellidos}, {reclu.nombre}</MenuItem>
                                    }
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mt: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} dateFormat>
                                    <Stack spacing={2} direction="row" alignItems="center">

                                        <DatePicker
                                            disabled={!admin}
                                            inputFormat="dd/MM/yyyy"
                                            label="Fecha Inicio"
                                            views={['year', 'month', 'day']}
                                            value={fechaInicio}
                                            onChange={(e) => { setFechaInicio(e); }}
                                            renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} />}
                                        />

                                        <DatePicker
                                            disabled={!admin}
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
                            {messageError && <Alert sx={{ mt: 2 }} severity='error'> {messageError}</Alert>}

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Titulaciones: </InputLabel>
                                <Select
                                    disabled={!admin}
                                    multiple
                                    onChange={(e) => setTitu_id(e.target.value)}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Titulaciones"
                                    value={titu_id}
                                >
                                    {titulaciones.map(
                                        titu => <MenuItem divider key={titu.id} value={titu.id} > {titu.nombre}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label" onChange={(e) => setVinc_id(e.target.value)}>Vinculacion: </InputLabel>
                                <Select disabled={!admin} onChange={(e) => setVinc_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={vinc_id} >
                                    {vincus.map(
                                        vincu => <MenuItem divider key={vincu.id} value={vincu.id} > {vincu.nombre}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            {tipoc_()}

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Puesto: </InputLabel>
                                <Select disabled={!admin} onChange={(e) => setPuesto_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={puesto_id}>
                                    {puestos.map(
                                        puesto => <MenuItem divider key={puesto.id} value={puesto.id} > {puesto.nombre}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            {
                                personas_()
                            }

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <InputLabel id="demo-simple-select-label">Jornada Laboral: </InputLabel>
                                <Select disabled={!admin} onChange={(e) => setJl_id(e.target.value)} labelId="demo-simple-select-label" id="demo-simple-select" label="Centro de trabajo" value={jl_id} >
                                    {jls.map(
                                        jl => <MenuItem divider key={jl.id} value={jl.id} > {jl.nombre}, {jl.horaSemanal} H/S</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <TextField disabled={!admin} id="outlined-basic" label="Requisitos" variant="outlined" onChange={(e) => setRequisitos(e.target.value)} value={requisitos} />
                            </FormControl>

                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>
                                <Autocomplete

                                    disablePortal
                                    id="combo-box-demo"
                                    options={optiones}
                                    onChange={handleInputChange2}
                                    renderInput={(params) => <TextField {...params} label="Candidatos:" />} />
                            </FormControl>
                            <FormControl fullWidth margin='normal' style={{ backgroundColor: 'white' }}>

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow >
                                                <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>APELLIDO</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>SEXO</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>ENTREVISTA</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {candis.map((candidato) => {
                                                if ((candidato.proceso.id === id) && candi_id.includes(candidato.candidatos.id))
                                                    return <TableRow hover="true" key={candidato.id} >
                                                        <TableCell>{candidato.candidatos.nombre}</TableCell>
                                                        <TableCell>{candidato.candidatos.apellido1}</TableCell>
                                                        <TableCell>{candidato.candidatos.sexo}</TableCell>
                                                        <TableCell>{candidato.entrevistado === "NO_ENTREVISTADO" ? "NO ENTREVISTADO" : candidato.entrevistado}</TableCell>
                                                        <TableCell>
                                                            <Stack spacing={-2} direction="row">
                                                                <Button onClick={() => editCandi(candidato.id)}  >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-pencil-square text-dark" viewBox="0 0 16 16">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg>
                                                                </Button>
                                                                <Button onClick={() => deleteCandidato(candidato.candidatos.id, candidato.id)}  >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi-trash-fill b-icon bi text-dark" viewBox="0 0 16 16" >
                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />

                                                                    </svg>
                                                                </Button>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </FormControl>

                            <Button onClick={(e) => updateProceso(e)} variant='contained' color='success' style={{ marginTop: "10px" }} disabled={!enabled}>SAVE</Button>
                            <Button variant='contained' style={{ marginTop: "10px", marginLeft: "10px" }} onClick={resetButton}> RESET</Button>
                            <Button onClick={(e) => navigate("/")} variant='contained' color='error' style={{ marginLeft: "10px", marginTop: "10px" }}> CANCEL</Button>
                        </div>
                    </form>
                </Paper>
            </Container>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Candidato</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Información de la entrevista
                    </DialogContentText>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel checked={entrevistado === "SÍ"} onChange={(e) => setEntrevistado(e.target.value)} value="SÍ" control={<Radio />} label="Sí" />
                        <FormControlLabel checked={entrevistado === "NO"} onChange={(e) => setEntrevistado(e.target.value)} value="NO" control={<Radio />} label="No" />
                        <FormControlLabel checked={entrevistado === "NO_ENTREVISTADO"} onChange={(e) => setEntrevistado(e.target.value)} value="NO_ENTREVISTADO" control={<Radio />} label="No entrevistado" />
                    </RadioGroup>

                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns} dateFormat>
                            <Stack spacing={2} direction="column">

                                <TextField
                                    id="outlined-basic"
                                    label="Motivo descarte"
                                    variant="outlined"
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                />
                                < DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    label="Fecha Entrevista"
                                    views={['year', 'month', 'day']}
                                    value={fEntrevista}
                                    onChange={(e) => { setfEntrevista(e) }}
                                    renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!(entrevistado)} onClick={(e) => updateCandi()}>Crear</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open_1}
                onClose={handleClose}
            >
                <DialogTitle>ERROR</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ha habido un error
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCELAR</Button>
                    <Button onClick={handleClose}>ACEPTAR</Button>
                </DialogActions>
            </Dialog>
        </div>


    )
}

export default UpdateProcesoComponent;