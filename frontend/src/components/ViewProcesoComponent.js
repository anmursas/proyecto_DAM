import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { useParams } from 'react-router-dom'

import ProcesoService from '../services/ProcesoService';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AuthService from '../services/auth.service';

const ViewProcesoComponent = () => {

  // El proceso cargado
  const [proceso, setProceso] = useState({
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
      "nombre": ""
    },
    laJornada: {
      "nombre": "",
    },
    lasTitulaciones: [
      {
        "nombre": ""
      }
    ],
    procesoCandidatos: [{
      "id": "0",
      "candidatos": {
        "nombre": "",
        "apellido1": "",
        "sexo": ""
      },
      "entrevistado": ""
    }

    ],
    requisitos: ""
  });

  const [titulaciones, setTitus] = useState([
    {
      id: 0,
      nombre: ""
    }
  ])

  const [candidatos, setCandidatos] = useState([
    {
      "id": 0,
      "candidatos": {
        "nombre": "",
        "apellido1": "",
        "sexo": ""
      },
      "entrevistado": "",
      "fechaE": "",
      "motivo": ""
    }
  ])

  let navigate = useNavigate()

  function getProcesoById() {
    ProcesoService.getProcesoById(id).then((response) => {
      setProceso(response.data);
      setTitus(response.data.lasTitulaciones);
      setCandidatos(response.data.procesoCandidatos);


    }).catch(error => {
      console.log(error);
    });
  }

  function getCandis() {
    setCandidatos(proceso.procesoCandidatos);
  }



  useEffect(
    () => {
      const user = AuthService.getCurrentUser();
      if (!user) {
        navigate("/login")
      }
      getProcesoById();
    }, [])

  useEffect(() => {
    getCandis();
  }, [proceso])


  const { id } = useParams();

  const headCells = [
    {
      id: 'dpto',
      numeric: false,
      disablePadding: false,
      label: 'DEPARTAMENTO',
    },
    {
      id: 'centro',
      numeric: false,
      disablePadding: false,
      label: 'CENTRO',
    },
    {
      id: 'reclu',
      numeric: false,
      disablePadding: false,
      label: 'RECLUTADOR',
    },
    {
      id: 'fechaI',
      numeric: false,
      disablePadding: false,
      label: 'FECHA INICIO',
    },
    {
      id: 'fechaF',
      numeric: false,
      disablePadding: false,
      label: 'FECHA FIN',
    },
    {
      id: 'vincu',
      numeric: false,
      disablePadding: false,
      label: 'VINCULACION',
    },
    {
      id: 'puesto',
      numeric: false,
      disablePadding: false,
      label: 'PUESTO',
    },
    {
      id: 'ct',
      numeric: false,
      disablePadding: false,
      label: 'CONTRATACION',
    },
    {
      id: 'jl',
      numeric: false,
      disablePadding: false,
      label: 'JORNADA',
    },
    {
      id: 'req',
      numeric: false,
      disablePadding: false,
      label: 'REQUISITOS',
    },
  ]




  return (
    <Box sx={{ mb: 40 }}>
      <h2> Vista proceso: {proceso.pro_cod}</h2>
      <Link to='/' >
        <AiFillHome style={{ height: 32, width: 32 }} />
      </Link>
      <Box sx={{ border: 0, padding: '5px 15px 5px 15px' }}>
        <Paper sx={{ width: '100%' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow >
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      style={{ fontWeight: 'bold' }}
                    >
                      {headCell.label}


                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow style={{ background: "#f8f9fa" }}>
                  <TableCell>{proceso.elDepartamento?.nombre}</TableCell>
                  <TableCell>{proceso.elCentroTrabajo?.nombre}</TableCell>
                  <TableCell>{proceso.elReclutador?.nombre}</TableCell>
                  <TableCell>{proceso.fechaInicio}</TableCell>
                  <TableCell>{proceso.fechaFin}</TableCell>
                  <TableCell>{proceso.laVinculacion?.nombre}</TableCell>
                  <TableCell>{proceso.elPuesto?.nombre}</TableCell>
                  <TableCell>{proceso.laContratacion?.nombre}</TableCell>
                  <TableCell>{proceso.laJornada?.nombre}</TableCell>
                  <TableCell>{proceso.requisitos}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <h3> Titulaciones</h3>

      <Box sx={{ marginLeft: '30%', marginRight: '30%' }} >
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>Titulacion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  titulaciones.map(
                    titulacion =>
                      <TableRow style={{ background: "#f8f9fa" }}>
                        <TableCell align={'center'}>{titulacion.nombre}</TableCell>
                      </TableRow>
                  )
                }

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <h3> Candidatos</h3>
      <Box sx={{ marginLeft: '30%', marginRight: '30%' }} >
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>APELLIDO</TableCell>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>SEXO</TableCell>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>ENTREVISTA</TableCell>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>FECHA ENTERVISTA</TableCell>
                  <TableCell align={'center'} style={{ fontWeight: 'bold' }}>MOTIVO DESCARTE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  candidatos.map(
                    titulacion =>
                      <TableRow hover key={titulacion.id} style={{ background: "#f8f9fa" }}>
                        <TableCell width={'10%'} align={'center'}>{titulacion.candidatos.nombre}</TableCell>
                        <TableCell width={'10%'} align={'center'}>{titulacion.candidatos.apellido1}</TableCell>
                        <TableCell width={'10%'} align={'center'}>{titulacion.candidatos.sexo}</TableCell>
                        <TableCell width={'10%'} align={'center'}>{titulacion.entrevistado === "NO_ENTREVISTADO" ? "NO ENTERVISTADO" : titulacion.entrevistado}</TableCell>
                        <TableCell width={'10%'} align={'center'}>{titulacion.fechaE}</TableCell>
                        <TableCell width={'10%'} align={'center'}>{titulacion.motivo}</TableCell>

                      </TableRow>

                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>



    </Box>
  )
}

export default ViewProcesoComponent