import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
import { filter } from 'lodash';
import { Link } from 'react-router-dom';

//api
import { axiosInstance } from '../../../api/axios';
//mui
import { Avatar, Button, Card, Checkbox, Container, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, TablePagination, Popover, MenuItem, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
//components
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import Iconify from '../../../components/iconify';
import Label from '../../../components/label'
//sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';

//mock
import USERLIST from '../../../_mock/user';
//utils
import { retrieveUserId } from '../../../utils/retrieveUserId';

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//==============FIXED DATA=======================
const TABLE_HEAD = [
  { id: 'name', label: 'Client', alignRight: false },
  { id: 'commentary', label: 'Nom de la mission', alignRight: false },
  { id: 'price', label: 'Prix', alignRight: false },
  { id: 'declarate', label: 'Déclaré', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];
//==============================================

export default function MissionPage() {

  const userId = retrieveUserId()
  //! ==============API=================
  const [missions, setMissions] = useState([]);
  const getMissions = useCallback(async () => {
    try {
      //! => Change user ID from localStorage
      // const response = await axiosInstance.get(`user/${userId}/mission`);
      const response = await axiosInstance.get('/user/1/mission');
      setMissions(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMissions();
  }, []);
  //========================================

  //==============UTILS FOR STATES====================
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {/*! ===================mapping of our missions ==========================*/}
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, commentary, totalPrice, declarate, status, client_id } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={'/assets/images/avatars/avatar_1.jpg'} />
                            <Typography component={Link} to={`/dashboard/clients/${client_id}`} variant="subtitle2" style={{ textDecoration: 'none' }} noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" style={{ textDecoration: 'none' }}><Link to={`/dashboard/missions/${id}`}>{commentary}</Link></TableCell>

                        <TableCell align="left">{totalPrice}€</TableCell>

                        <TableCell align="left">{declarate ? 'Oui' : 'Non'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'En Cours' && 'warning') || 'success'}>{status}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );

}
