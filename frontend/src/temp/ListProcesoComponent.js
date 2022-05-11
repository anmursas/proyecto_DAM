import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProcesoService from '../services/ProcesoService';
import { MdRemoveRedEye } from "react-icons/md";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { TableSortLabel, Stack } from '@mui/material';


const ListProcesoComponent = () => {



    const useStyles = makeStyles({
        table: {
            minWidth: 650,
            "& .MuiTableCell-root": {
                borderLeft: "1px solid rgba(224, 224, 224, 1)"
            },
        },
        columns: {
            minWidth: 150,
            minHeight: 10
        },
        rows: {

        }
    });
    const classes = useStyles()
    // Declaramos una variable de estado, llamada "proceso"
    const [proceso, setProceso] = useState([{
        id: 0,
        elDepartamento: {
            "nombre": "",
        },
        elCentroTrabajo: {
            "nombre": ""
        },
        elReclutador: {
            "nombre": ""
        },
        fechaInicio: "",
        fechaFin: "",
        laVinculacion: {
            "nombre": ""
        },
        elPuesto: {
            "nombre": ""
        },
        laContratacion: {
            "codigo": ""
        },
        laJornada: {
            "nombre": ""
        },
        requisitos: ""
    }

    ])

    useEffect(() => {
        getAllProcesos();
    }, [])

    const getAllProcesos = () => {
        ProcesoService.getAllProcesos().then((response) => {
            setProceso(response.data)
            console.log("###########################")
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteProceso = (procesoId) => {
        console.log(procesoId)
        ProcesoService.deleteProceso(procesoId).then((response) => {
            getAllProcesos();
        }).catch(error => {
            console.log(error)
        });
    }

    const handleOrder = (e) => {
        console.log(e.target.lastChild);
    }


    const columns = [
        { field: "cod", headerName: "CÓDIGO", sortable: true, valueFormatter: (proceso) => proceso.pro_cod },
        { field: "dpto", headerName: "DPTO", sortable: true, valueFormatter: (proceso) => proceso.elDepartamento.nombre },
        { field: "centro", headerName: "CENTRO", sortable: true, valueFormatter: (proceso) => proceso.elCentroTrabajo.nombre },
        { field: "reclu", headerName: "RECLUTADOR", sortable: true, valueFormatter: (proceso) => proceso.elReclutador.nombre },
        { field: "fechaI", headerName: "FECHA INICIO", sortable: true, valueFormatter: (proceso) => proceso.fechaInicio },
        { field: "fechaF", headerName: "FECHA FIN", sortable: true, valueFormatter: (proceso) => proceso.fechaFin },
        { field: "vincu", headerName: "VINCULACION", sortable: true, valueFormatter: (proceso) => proceso.laVinculacion.nombre },
        { field: "puesto", headerName: "PUESTO", sortable: true, valueFormatter: (proceso) => proceso.elPuesto.nombre },
        { field: "tc", headerName: "CONTRATACIÓN", sortable: true, valueFormatter: (proceso) => proceso.laContratacion.nombre },
        { field: "jl", headerName: "JORNADA LABORAL", sortable: true, valueFormatter: (proceso) => proceso.laJornada.nombre },
        { field: "req", headerName: "REQUISITOS", sortable: true, valueFormatter: (proceso) => proceso.requisitos },
        { field: "acc", headerName: "ACCIONES", sortable: false }
    ]


    return (
        <div>
            <h2 className='text-center'> Lista Procesos </h2>
            <Link to='/add-proceso' className='btn btn-primary mb-2'> Crear proceso nuevo</Link>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>


            <TableContainer style={{ textAlign: "center" }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: 'grey' }}>
                        <TableSortLabel style={{ fontWeight: 'bold' }} >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <span>
                                    ID
                                </span>


                            </div>
                        </TableSortLabel>
                        {
                            columns.map(
                                (
                                    {
                                        headerName, sortable
                                    }
                                ) => {
                                    return <TableCell onClick={handleOrder} key={headerName}>{headerName}</TableCell>
                                }
                            )
                        }
                    </TableHead>

                    <TableBody>
                        {
                            proceso.map(
                                (proceso) =>
                                (
                                    <TableRow
                                        key={proceso.id}  >
                                        <TableCell> {proceso.id} </TableCell>
                                        <TableCell> {proceso.pro_cod} </TableCell>
                                        <TableCell> {proceso.elDepartamento.nombre} </TableCell>
                                        <TableCell> {proceso.elCentroTrabajo.nombre} </TableCell>
                                        <TableCell> {proceso.elReclutador.apellidos}, {proceso.elReclutador.nombre} </TableCell>
                                        <TableCell> {proceso.fechaInicio} </TableCell>
                                        <TableCell> {proceso.fechaFin} </TableCell>
                                        <TableCell> {proceso.laVinculacion.nombre} </TableCell>
                                        <TableCell> {proceso.elPuesto.nombre} </TableCell>
                                        <TableCell> {proceso.laContratacion?.nombre} </TableCell>
                                        <TableCell> {proceso.laJornada.nombre},  {proceso.laJornada.horaSemanal} H/S </TableCell>
                                        <TableCell> {proceso.requisitos} </TableCell>
                                        <TableCell>
                                            <Stack spacing={2} direction="row">
                                                <Link to={`/edit-proceso/${proceso.id}`} ><EditIcon /></Link>

                                                <Link className="btn btn-primary" to={`/view-proceso/${proceso.id}`} ><MdRemoveRedEye /></Link>
                                                <button className='btn btn-danger' onClick={() => deleteProceso(proceso.id)} > <DeleteIcon /></button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}

                    </TableBody>
                </Table>
            </TableContainer>

            <Link to={'/sortable2'} > SORTABLE </Link>








        </div >
    )
}

export default ListProcesoComponent



