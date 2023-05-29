import { Link, useNavigate } from "react-router-dom";
import { useState, forwardRef } from "react";
//mui
import { Avatar, Button, Card, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Popover, Slide, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
//utils
import { filter } from "lodash";
//api
import { axiosPrivateInstance } from "../../../../api/axios";
//components

import Label from "../../../../components/label/Label";
import Iconify from "../../../../components/iconify/Iconify";
import Scrollbar from "../../../../components/scrollbar/Scrollbar";
import { UserListHead, UserListToolbar } from "../../../../sections/@dashboard/user";



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nom de la mission', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'price', label: 'Prix', alignRight: false },
  { id: 'commentary' },
  { id: 'declarate', label: 'Déclaré', alignRight: false },
  { id: '' },
];
// ----------------------------------------------------------------------

//Animation on modal
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function ClientListMission({ missions, index }) {
  //==============UTILS FOR STATES====================


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [missionId, setMissionId] = useState(undefined);

  const [openMissionDelete, setOpenMissionDelete] = useState(false);

  const handleDeleteMissionClickOpen = (id) => {
    setOpenMissionDelete(true);
    setMissionId(id);
  };

  const handleCloseMissioneDelete = () => {
    setOpenMissionDelete(false);
  };

  const handleMissionDelete = async () => {

    try {
      await axiosPrivateInstance.delete(`/mission/${missionId}`);
      window.location.reload();
    } catch (error) {
      console.log("La mission n'a pas pu être supprimée", error);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = missions.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - missions.length) : 0;

  const filteredUsers = applySortFilter(missions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  // Handle Delete modal
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={missions.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, totalPrice, declarate, status, client_id } = row;
                  const selectedUser = selected.indexOf(name) !== -1;
                  return (

                    <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none" >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography component={Link} to={`/dashboard/mission/${id}`} variant="subtitle2" noWrap >
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Label color={(status === 'En Cours' && 'warning') || 'success'}>{status}</Label>
                      </TableCell>
                      <TableCell align="left">{totalPrice}€</TableCell>

                      <TableCell align="left" ></TableCell>

                      <TableCell align="left">{declarate ? 'Oui' : 'Non'}</TableCell>

                      <TableCell align="right">

                        <Tooltip title="Supprimer">
                          <IconButton size="large" color="inherit"
                            onClick={() => handleDeleteMissionClickOpen(id)}
                          >
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* ========================= Conditionnal render ========================== */}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={missions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Card>
      <Dialog
        open={openMissionDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseMissioneDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">{"Supprimer la mission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" >
            Êtes-vous sûr de vouloir supprimer cette mission ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMissioneDelete} color="success">
            Annuler
          </Button>
          <Button onClick={handleMissionDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}