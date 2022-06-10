import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, ListItem, ListItemIcon, List, ListItemText, Dialog, DialogContent, RadioGroup, FormControlLabel, Radio, DialogActions, TextField, DialogContentText, DialogTitle, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ResponsivePie } from '@nivo/pie';
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import ValuesService from '../services/ValuesService';


const AdminCandidatosComponent = () => {
    const navigate = useNavigate();
    const [candidatos, setCandidatos] = useState([]);
    const [hombres, setHombres] = useState(0)
    const [mujeres, setMujeres] = useState(0)

    const [updating, setUpdating] = useState(false);

    // New/Update Candidato
    const [candi_name, setCandName] = useState("");
    const [candi_ape, setCandApe] = useState("");
    const [candi_sexo, setCandSex] = useState("");
    const [candi_id, setCandiId] = useState("");

    const [m_reclu, setM_reclu] = useState([]);
    const [ms_reclu, setMS_reclu] = useState([]);

    const [open, setOpen] = useState(false);

    const [perc1, setPerc1] = useState(0);
    const [perc2, setPerc2] = useState(0);
    const [perc3, setPerc3] = useState(0);
    const [perc4, setPerc4] = useState(0);
    const [perc5, setPerc5] = useState(0);

    const [percs1, setPercs1] = useState(0);
    const [percs2, setPercs2] = useState(0);
    const [percs3, setPercs3] = useState(0);
    const [percs4, setPercs4] = useState(0);
    const [percs5, setPercs5] = useState(0);



    const data = [
        {
            "id": "Hombres",
            "label": "Hombres",
            "value": hombres,
            "color": "#b8d9ec"
        },
        {
            "id": "Mujeres",
            "label": "Mujeres",
            "value": mujeres,
            "color": "#1f1161"
        },
    ];

    const dptos1 = [
        {
            name: "ARQUITECTURA",
            perc: perc1,
            color: "#ddcc77"
        },
        {
            name: "CIVIL",
            perc: perc2,
            color: "#44aa99"
        },
        {
            name: "DESARROLLO DE NEGOCIO",
            perc: perc3,
            color: "#117733"
        },
        {
            name: "GESTIÓN OPERATIVA",
            perc: perc4,
            color: "#332288"
        },
        {
            name: "TRANSPORTES Y MOVILIDAD",
            perc: perc5,
            color: "#88ccee"
        }
    ]
    const dptos2 = [
        {
            name: "ARQUITECTURA",
            perc: percs1,
            color: "#ddcc77"
        },
        {
            name: "CIVIL",
            perc: percs2,
            color: "#44aa99"
        },
        {
            name: "DESARROLLO DE NEGOCIO",
            perc: percs3,
            color: "#117733"
        },
        {
            name: "GESTIÓN OPERATIVA",
            perc: percs4,
            color: "#332288"
        },
        {
            name: "TRANSPORTES Y MOVILIDAD",
            perc: percs5,
            color: "#88ccee"
        }
    ]

    var percentil = Math.trunc((100 * mujeres) / (hombres + mujeres), 3)

    function deleteCandidato(id) {
        ValuesService.deleteCandidato(id).then((response) => {
            window.location.reload(true)
        }).catch(error => {
            console.log(error)
        })
    }

    function editCandidato(id) {
        setCandiId(id.id)
        setCandName(id.nombre)
        setCandApe(id.apellido1)
        setCandSex(id.sexo)
        setUpdating(true)
        setOpen(true)
    }

    function newCandi() {
        setCandName("")
        setCandApe("")
        setCandSex("")
        setUpdating(false);
        setOpen(true)
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit() {
        const candi = {
            nombre: candi_name,
            apellido1: candi_ape,
            sexo: candi_sexo,
        };

        if (updating) {
            ValuesService.updateCandidato(candi_id, candi).then((response) => {
                window.location.reload(true);
            }).catch(error => {
                console.log(error)
            })
        } else {
            ValuesService.createCandidato(candi).then((response) => {
                window.location.reload(true);
            }).catch((error) => {
                console.log(error);
            });
        }

        setOpen(false);
    }


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            ValuesService.isAdmin().then((response) => {
                if (response.data === true) {
                    ValuesService.getAllCandidatos().then((response2) => {
                        setCandidatos(response2.data)
                    })
                    ValuesService.getCandidatosPorDepartamento(1).then((response) => {
                        setPerc1(response.data)
                    })
                    ValuesService.getCandidatosPorDepartamento(2).then((response) => {
                        setPerc2(response.data)
                    })
                    ValuesService.getCandidatosPorDepartamento(3).then((response) => {
                        setPerc3(response.data)
                    })
                    ValuesService.getCandidatosPorDepartamento(4).then((response) => {
                        setPerc4(response.data)
                    })
                    ValuesService.getCandidatosPorDepartamento(5).then((response) => {
                        setPerc5(response.data)
                    })
                    ValuesService.getSeleccionadosPorDepartamento(1).then((response) => {
                        setPercs1(response.data)
                    })
                    ValuesService.getSeleccionadosPorDepartamento(2).then((response) => {
                        setPercs2(response.data)
                    })
                    ValuesService.getSeleccionadosPorDepartamento(3).then((response) => {
                        setPercs3(response.data)
                    })
                    ValuesService.getSeleccionadosPorDepartamento(4).then((response) => {
                        setPercs4(response.data)
                    })
                    ValuesService.getSeleccionadosPorDepartamento(5).then((response) => {
                        setPercs5(response.data)
                    })
                    ValuesService.getCandidatasBySeleccionador().then((response) => {
                        setM_reclu(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
                    ValuesService.getSeleccionadasBySeleccionador().then((response) => {
                        setMS_reclu(response.data)
                    }).catch(error => {
                        console.log(error)
                    })

                } else {
                    navigate("/login")
                }
            })
        } else {
            navigate("/login")
        }

    }, [])



    useEffect(() => {
        var h = 0;
        var m = 0;
        for (let index = 0; index < candidatos.length; index++) {

            if (candidatos[index].sexo == "M") {
                h++;
            } else if (candidatos[index].sexo == "F") {
                m++
            }
        }
        setHombres(h);
        setMujeres(m);

    }, [candidatos])





    function percentil_() {
        return <Grid container spacing={2} sx={{ mt: 2 }}>

            <Grid item xs>
                <Card >
                    <CardContent style={{ height: 300 }}>
                        <ResponsivePie
                            data={data}
                            margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            colors={{ datum: 'data.color' }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsStraightLength={6}
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [['darker', 2]]
                            }}
                            fill={[
                                {
                                    match: { id: 'hombres' }, id: 'hombres'
                                }, {
                                    match: { id: 'mujeres' }, id: 'mujeres'
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
                                    effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
                                }
                            ]}
                        />
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs>
                <Card >
                    <CardContent style={{ height: 300 }}>
                        <h3>GLOBAL  </h3>
                        <h1 style={{ fontSize: "600%", color: (percentil > 50) ? "#86dc3d" : "#E13838" }}> {percentil}%</h1>
                    </CardContent>
                </Card>
            </Grid>

        </Grid >
    }
    function m_byDpto() {

        return <Grid container spacing={2} sx={{ mt: 2 }} alignItems="left">
            <Grid item xs={6}>
                <Card>
                    <CardContent sx={{ ml: 2 }} style={{ height: dptos1.length * 50 }}>
                        <Typography>CANDIDATAS POR DEPARTAMENTO</Typography>
                        {dptos1.map(
                            dpto => <div style={{ display: 'flex', justifyContent: 'left', marginTop: 2 }}>
                                <List>
                                    <ListItem sx={{ padding: 0 }}>
                                        <ListItemIcon>
                                            <CircleIcon style={{ color: dpto.color, fontSize: 15 }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography fontSize={15}><strong>{dpto.name}: {dpto.perc}%</strong></Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent sx={{ ml: 2 }} style={{ height: m_reclu.length * 50 }}>
                        <Typography>CANDIDATAS POR SELECCIONADOR</Typography>
                        {m_reclu.map(
                            mReclu => <div style={{ display: 'flex', justifyContent: 'left', marginTop: 2 }}>
                                <List>
                                    <ListItem sx={{ padding: 0 }}>
                                        <ListItemIcon>
                                            <CircleIcon style={{ fontSize: 15 }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography fontSize={15}><strong>{mReclu.name}: {mReclu.mujeres > 0 ? ((mReclu.mujeres * 100) / (mReclu.mujeres + mReclu.hombres)).toFixed(0) : "0"}%</strong></Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>

                            </div>
                        )}
                    </CardContent>
                </Card>


            </Grid>
        </Grid >

    }

    function m_byReclu() {
        return <Grid container spacing={2} sx={{ mt: 2 }} alignItems="left">
            <Grid item xs={6}>
                <Card>
                    <CardContent sx={{ ml: 2 }} style={{ height: dptos2.length * 50 }}>
                        <Typography>SELECCIONADAS POR DEPARTAMENTO</Typography>
                        {dptos2.map(
                            dpto => <div style={{ display: 'flex', justifyContent: 'left', marginTop: 2 }}>
                                <List>
                                    <ListItem sx={{ padding: 0 }}>
                                        <ListItemIcon>
                                            <CircleIcon style={{ color: dpto.color, fontSize: 15 }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography fontSize={15}><strong>{dpto.name}: {dpto.perc}%</strong></Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent sx={{ ml: 2 }} style={{ height: ms_reclu.length * 50 }}>
                        <Typography>SELECCIONADAS POR RECLUTADOR</Typography>
                        {ms_reclu.map(
                            mReclu => <div style={{ display: 'flex', justifyContent: 'left', marginTop: 2 }}>
                                <List>
                                    <ListItem sx={{ padding: 0 }}>
                                        <ListItemIcon>
                                            <CircleIcon style={{ fontSize: 15 }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography fontSize={15}><strong>{mReclu.name}: {mReclu.mujeres > 0 ? ((mReclu.mujeres * 100) / (mReclu.mujeres + mReclu.hombres)).toFixed(0) : "0"}%</strong></Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        )}
                    </CardContent>
                </Card>


            </Grid>
        </Grid >
    }

    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                    sx={{ flex: "1 1 100%", paddingTop: 2 }}
                    variant="h4"
                    id="tableTitle"
                    style={{ fontWeight: "bold" }}
                >
                    Candidatos
                </Typography>
                <Button onClick={(e) => newCandi()} sx={{ mr: 8 }}>
                    <svg data-v-1f90038a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" alt="icon" id="nueva-imputacion" xmlns="http://www.w3.org/2000/svg" fill="rgb(31, 17, 97)" style={{ height: 32, width: 32 }}>
                        <g>
                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clipRule="evenodd"></path>
                        </g>
                    </svg>
                </Button>
            </Box>
            <Box sx={{ marginLeft: '10%', marginRight: '10%', mt: 2 }} >

                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>APELLIDO</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>SEXO</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>PROCESOS</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidatos.map((candidato, index) => {
                                    return <TableRow style={index % 2 ? { background: "#f8f9fa" } : { background: "#ebeced" }}
                                        hover="true" key={candidato.id}>
                                        <TableCell>{candidato.nombre}</TableCell>
                                        <TableCell>{candidato.apellido1}</TableCell>
                                        <TableCell>{candidato.sexo}</TableCell>
                                        <TableCell>{candidato.procesoCandidatos?.length}</TableCell>
                                        <TableCell align='left'>
                                            <div>
                                                <Stack direction="row">
                                                    <Button onClick={(e) => editCandidato(candidato)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1h4.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                        </svg>
                                                    </Button>
                                                    <Button onClick={(e) => deleteCandidato(candidato.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16" >
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1h4.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />

                                                        </svg>
                                                    </Button>

                                                </Stack>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>



                {
                    percentil_()
                }
                {
                    m_byDpto()
                }

                {
                    m_byReclu()
                }




            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Candidato</DialogTitle>
                <DialogContent>
                    <DialogContentText>{updating ? "ACTUALIZANDO CANDIDATO" : "NUEVO CANDIDATO"} </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={candi_name}
                        onChange={(e) => setCandName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Apellido"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={candi_ape}
                        onChange={(e) => setCandApe(e.target.value)}
                    />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            onChange={(e) => setCandSex(e.target.value)}
                            value="F"
                            checked={candi_sexo === "F"}
                            control={<Radio />}
                            label="Mujer"
                        />
                        <FormControlLabel
                            onChange={(e) => setCandSex(e.target.value)}
                            value="M"
                            checked={candi_sexo === "M"}
                            control={<Radio />}
                            label="Hombre"
                        />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!(candi_name && candi_ape && candi_sexo)}
                        onClick={handleSubmit}
                    >
                        {updating ? "ACTUALIZAR" : "CREAR"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default AdminCandidatosComponent;