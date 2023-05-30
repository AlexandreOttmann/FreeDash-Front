import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState, forwardRef } from 'react';
import { filter } from 'lodash';
import { Link } from 'react-router-dom';

//api
import { axiosPrivateInstance } from '../../../api/axios';
//mui
import {
  Avatar, Button, Card, Checkbox, Container, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, TablePagination, Popover, MenuItem, Paper,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide
} from '@mui/material';
import { useTheme } from '@mui/material';
//components
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import Iconify from '../../../components/iconify';
import Label from '../../../components/label'
import MotionSection from '../../../sections/@dashboard/user/MotionSection';
import { AnimatePresence, motion } from 'framer-motion';
//sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';

//mock
import USERLIST from '../../../_mock/user';

//Transition for modale

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//===============UTILS=================

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
    return filter(array, (_user) => (_user.clientFirstName + _user.clientLastName).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//==============FIXED DATA for table header=======================
const TABLE_HEAD = [
  { id: 'clientFirstName', label: 'Client', alignRight: false },
  { id: 'commentary', label: 'Nom de la mission', alignRight: false },
  { id: 'totalPrice', label: 'Prix', alignRight: false },
  { id: 'declarate', label: 'Déclaré', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];
//==============================================

export default function MissionPage() {

  const [missions, setMissions] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null)
  //! ==============API=================
  const getMissions = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/mission`);
      console.log(response.data)
      setMissions(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMissions();
  }, []);


  //==============UTILS FOR STATES====================
  const [open, setOpen] = useState(null);

  const [openMissionDelete, setOpenMissionDelete] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setIdToDelete(id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //! A RETIRER QUAND LA FONCTION SERA FAITE
  const handleGeneratePdf = async () => {
    const idMission = idToDelete
  }


  //  Handle opening modale for delete
  const handleDeleteMissionClickOpen = () => {
    setOpenMissionDelete(true);
    handleCloseMenu()

  };

  const handleCloseMissioneDelete = () => {
    setOpenMissionDelete(false);
  };

  const handleMissionDelete = async () => {
    try {
      await axiosPrivateInstance.delete(`/mission/${idToDelete}`);
      window.location.reload();
    } catch (error) {
      console.log("La mission n'a pas pu être supprimée", error);
    }
  };

  //=================HANDLE SORTING=================

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(missions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  //==============================================
  //MUI
  const theme = useTheme()



  return (
    <>
      <Helmet>
        <title> Missions</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste de vos missions
          </Typography>
          <Button component={Link} to="/dashboard/newmission" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouvelle mission
          </Button>
        </Stack>
        {missions.length === 0 ? (
          <MotionSection delayTime={0.3}>
            <Typography variant="h4" sx={{ my: 5 }} align="center">Vous n'avez pas encore ajouté de mission</Typography>
            <Link to='/dashboard/newmission'><Typography variant='body1' align="center">Voulez-vous ajouter une première mission ?</Typography></Link>
          </MotionSection>
        ) : (

          <Card >
            <MotionSection delayTime={0.1}>
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={filteredUsers.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    {/*! ===================mapping of our missions ==========================*/}
                    <TableBody>
                      <AnimatePresence>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                          const { id, name, totalPrice, declarate, status, client_id, clientFirstName, clientLastName } = row;
                          const selectedUser = selected.indexOf(name) !== -1;



                          return (
                            <TableRow
                              component={motion.tr}
                              key={id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2, delay: 0.2 * index }}
                              hover
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedUser}
                            >

                              <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                              </TableCell>

                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={name} src={`/assets/images/avatars/avatar_${client_id}.jpg`} />
                                  <Typography component={Link} to={`/dashboard/client/${client_id}`} variant="subtitle2" style={{ textDecoration: 'none' }} noWrap>
                                    {clientFirstName} {clientLastName}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left" style={{ textDecoration: 'none' }}><Link to={`/dashboard/mission/${id}`}>{name}</Link></TableCell>

                              <TableCell align="left">{totalPrice}€</TableCell>

                              <TableCell align="left">{declarate ? 'Oui' : 'Non'}</TableCell>

                              <TableCell align="left">
                                <Label color={(status === 'En Cours' && 'warning') || 'success'}>{status}</Label>
                              </TableCell>

                              <TableCell align="right">
                                <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                                  <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
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
                      </AnimatePresence>
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
            </MotionSection>
          </Card>
        )}
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1.5,
            width: 170,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* //! FONCTION CREER LE PDF  */}
        <MenuItem sx={{ color: 'error.main' }} onClick={handleGeneratePdf}>
          <Button sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:file-add-outline'} sx={{ mr: 2 }} />
            Générer Pdf
          </Button>
        </MenuItem>

        <Link to={`/dashboard/mission/${idToDelete}`}>
          <MenuItem>
            <Button sx={{ color: 'warning.main' }}>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Modifier
            </Button>
          </MenuItem>
        </Link>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteMissionClickOpen}>
          <Button sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Supprimer
          </Button>
        </MenuItem>


      </Popover>
      {/* DELETE MODALE */}
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
  );

}
