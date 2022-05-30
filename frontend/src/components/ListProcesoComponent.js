import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import ProcesoService from '../services/ProcesoService';
import { useState, useEffect } from 'react'
import { Button, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';



function createData(id, cod, dpto, centro, reclu_id, reclu_nom, reclu_ape, fechaI, fechaF, vincu, puesto, jl, jl_hs, req) {
  return {
    id,
    cod,
    dpto,
    centro,
    reclu_id,
    reclu_nom,
    reclu_ape,
    fechaI,
    fechaF,
    vincu,
    puesto,
    jl,
    jl_hs,
    //req
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  } 
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Nombre columnas
const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'cod',
    numeric: false,
    disablePadding: false,
    label: 'CODIGO',
  },
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
    id: 'reclu_nom',
    numeric: false,
    disablePadding: false,
    label: 'SELECCIONADOR',
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
    id: 'jl',
    numeric: false,
    disablePadding: false,
    label: 'JORNADA',
  },
  // {
  //   id: 'req',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'REQUISITOS',
  // },
];


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};




export default function ListProcesoComponent() {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rawRows, setRawRows] = useState([])
  const [open_1, setOpen_1] = useState(false);

  function handleClose(e) {
    setOpen_1(false);
}







  const rows = []
  for (let index = 0; index < rawRows.length; index++) {
    rows.push(
      createData(
        rawRows[index].id,
        rawRows[index].pro_cod,
        rawRows[index].elDepartamento.nombre,
        rawRows[index].elCentroTrabajo.nombre,
        rawRows[index].elReclutador.id,
        rawRows[index].elReclutador.nombre,
        rawRows[index].elReclutador.apellidos,
        rawRows[index].fechaInicio,
        rawRows[index].fechaFin,
        rawRows[index].laVinculacion.nombre,
        rawRows[index].elPuesto.nombre,
        rawRows[index].laJornada.nombre,
        rawRows[index].laJornada.horaSemanal,
        //rawRows[index].requisitos
      )
    )

  }



  useEffect(() => {
    let isMounted = true;

    ProcesoService.getAllProcesos().then((response) => {
      if (isMounted) {
        setRawRows(response.data)
      }
    }).catch(error => {
      setOpen_1(true);
      console.log(error);
    })
    return() => {isMounted = false};
  }, [])


  // Borrar proceso
  const deleteProceso = (procesoId) => {
    console.log(procesoId)
    ProcesoService.deleteProceso(procesoId).then(() => {
      ProcesoService.getAllProcesos().then((response) => {
        setRawRows(response.data)
      }).catch(error => {
        setOpen_1(true);
        console.log(error)
      })
    }).catch(error => {
      setOpen_1(true);
      console.log(error)
    });
  }



  // Ordenar filas
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // Cambiar de página 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  // Cambiar a editar el proceso
  const handleEdit = (id) => {
    navigate(`/edit-proceso/${id}`)
  }

  // Cambiar a vista del proceso
  const handleView = (id) => {
    navigate(`/view-proceso/${id}`)
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  return (
    <Box sx={{ border: 0, padding: '5px 15px 5px 15px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"


          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      style={index % 2 ? { background: "#f8f9fa" } : { background: "#ebeced" }}
                    >

                      <TableCell >

                      </TableCell>

                      <TableCell component="th" id={labelId} scope="row" padding="none">{row.id}</TableCell>
                      <TableCell align="left">{row.cod}</TableCell>
                      <TableCell align="left">{row.dpto}</TableCell>
                      <TableCell align="left">{row.centro}</TableCell>
                      <TableCell align="left">{row.reclu_nom}</TableCell>
                      <TableCell align="left">{row.fechaI}</TableCell>
                      <TableCell align="left">{row.fechaF}</TableCell>
                      <TableCell align="left">{row.vincu}</TableCell>
                      <TableCell align="left">{row.puesto}</TableCell>
                      <TableCell align="left">{row.jl}, {row.jl_hs}H/S</TableCell>
                      {/* <TableCell align="left">{row.req}</TableCell> */}
                      <TableCell >

                      </TableCell>
                      <TableCell>
                        <Stack spacing={-2} direction="row">
                          <Button onClick={() => handleEdit(row.id)}  >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-pencil-square text-dark" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                          </Button>

                          <Button onClick={() => handleView(row.id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="dark-grey" className="bi bi-eye-fill text-dark" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                          </Button>

                          <Button onClick={() => deleteProceso(row.id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi-trash-fill b-icon bi text-dark" viewBox="0 0 16 16" >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />

                            </svg>
                          </Button>
                        </Stack>

                      </TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow

                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}

        />
      </Paper>

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


    </Box>

  );
}