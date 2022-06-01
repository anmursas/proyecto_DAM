import { Button, Card, CardContent, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ResponsivePie } from '@nivo/pie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import ValuesService from '../services/ValuesService';


const AdminCandidatosComponent = () => {
    const navigate = useNavigate();
    const [candidatos, setCandidatos] = useState([]);
    const [hombres, setHombres] = useState(0)
    const [mujeres, setMujeres] = useState(0)

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

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            ValuesService.getAllCandidatos().then((response) => {
                setCandidatos(response.data)
            })
        } else {
            navigate("/login")
        }

    }, [navigate])
    var percentil = Math.trunc((100 * mujeres) / (hombres + mujeres), 3)


    useEffect(() => {
        var h = 0;
        var m = 0;
        for (let index = 0; index < candidatos.length; index++) {

            if (candidatos[index].sexo == "M") {
                h++;
                console.log("M")
            } else if (candidatos[index].sexo == "F") {
                m++
            }

        }
        setHombres(h);
        setMujeres(m);

    }, [candidatos])

    function per_mujer() {
        if (percentil > 50) {
            return <h1 style={{ fontSize: "600%", color: "#86dc3d" }}>{percentil}%</h1>

        } else {
            return <h1 style={{ fontSize: "600%", color: "#f20000" }}>{percentil}%</h1>

        }
    }



    function percentil_() {
        return <Grid container spacing={2} sx={{mt:2}}>

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
                <Button sx={{ mr: 8 }}>
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
                                    <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidatos.map((candidato) => {
                                    return <TableRow hover="true" key={candidato.id}>
                                        <TableCell>{candidato.nombre}</TableCell>
                                        <TableCell>{candidato.apellido1}</TableCell>
                                        <TableCell>{candidato.sexo}</TableCell>
                                        <TableCell align='left'>
                                            <Stack direction="row">
                                                <Button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </Button>
                                                <Button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="dark-grey" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                    </svg>
                                                </Button>
                                                <Button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" viewBox="0 0 16 16" >
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
                </Paper>



                {
                    percentil_()
                }
            </Box>
        </div>
    );
};

export default AdminCandidatosComponent;