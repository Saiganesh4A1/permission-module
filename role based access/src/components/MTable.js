import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import SearchInput from './SearchInput';
import TableSortLabel from '@mui/material/TableSortLabel';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PendingIcon from '@mui/icons-material/Pending';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TablePagination, Toolbar,
  InputAdornment,
} from '@material-ui/core';
import AddButton from './AddButton';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 15,
    padding: '20px',
  },
  table: {
    minWidth: 650,
    '& thead th': {
      color: '#ffffff',
    },
    '& thead th:hover': {
      color: '#ffffff',
    },
  },
  tableContainer: {
    borderRadius: 15,
    maxWidth: '90vw',
    boxSizing: 'border-box',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  },
  tableHeader: {
    // background:'#590037',
    background: '#3c8dbc'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: theme.palette.getContrastText(theme.palette.primary.light),
    fontSize: '17px',
  },
  avatar: {
    // backgroundColor:'#8267BE',
    // color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: '20px'
  },
  name: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '17px'
  },
  tooltip: {
    fontSize: '18px',
    marginRight: '10px',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  toolbar: {
    marginTop: '25px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    borderRadius: '15px',
    // backgroundColor:'#590037',
    backgroundColor: "#3c8dbc",
    color: '#ffffff',
    marginTop: '-40px',
    width: 'fit-content',
    padding: '5px 20px',
  },

  '@media only screen and (max-width: 600px)': {
    toolbar: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }

  }
}));

//fixed different background colors for the avatar.
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  // console.log(color)
  return color;
}
function stringToLetter(name) {
  let string = "";
  let letters = "";
  if (name.split(" ")[1] === undefined) {
    letters = string.concat(name.split(" ")[0][0].toString())
  } else if (name.split(" ")[1]) {
    // console.log(name.split(" ")[1]);
    letters = string.concat(`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`);
  }
  // console.log(letters);

  return letters;
}
function stringAvatar(name) {
  return {
    sx: {
      backgroundColor: stringToColor(name)
    },
    children: stringToLetter(name)
  };
}
// // if we want random colors for avatars
// function randomColor() {
//   let hex = Math.floor(Math.random() * 0xFFFFFF);
//   let color = "#" + hex.toString(16);
// // console.log("random avatar color-----",color)
//   return color;
// }

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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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


function MTable({ columns, datas, label, searchLabel, edit, add, deleteAction, userColumn, view, dropDown, uploadButton }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  let navigate = useNavigate()
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // let data = searchTerm.length < 2 ? datas : searchResults
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearch = e => {

    let target = e.target.value;
    // setSearchTerm(target)
    setFilterFn({
      fn: items => {
        if (target !== "") {
          const filteredList = items.filter(item => Object.values(item).join(" ").toLowerCase().includes(target.toLowerCase()))
          // setSearchResults(filteredList)
          return filteredList
        }
        else {
          // setSearchResults(datas)
          return items
        }
      }
    })
  }
  const createSortHandler = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(datas), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const MenuPrevilege = () => {
    navigate('/asset/privileges')
  }

  return (
    <Paper className={classes.paper}>
      <h3 className={classes.label}>{label}</h3>
      <Toolbar className={classes.toolbar}>
        <div>
          <SearchInput
            className={classes.searchBox}
            label={searchLabel}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>)
            }}
            onChange={handleSearch}
          />
          {dropDown}
        </div>
        <div>
          {uploadButton}
          <AddButton onClick={add} />
        </div>
      </Toolbar>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {
                columns.map((colData) => (
                  <TableCell key={colData.id} className={classes.tableHeaderCell} sortDirection={orderBy === colData.id ? order : false}>

                    <TableSortLabel
                      active={orderBy === colData.id}
                      direction={orderBy === colData.id ? order : 'asc'}
                      onClick={() => { createSortHandler(colData.id) }}
                      className={classes.tableSortLabel}
                    >{colData.label}
                    </TableSortLabel>

                  </TableCell>
                ))
              }
              <TableCell className={classes.tableHeaderCell} >Action</TableCell>
              {
                userColumn && <TableCell className={classes.tableHeaderCell} >Users</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody >
            {

              recordsAfterPagingAndSorting().map((rowData, index) => (
                // FBF2FF
                <TableRow key={rowData.id} style={index % 2 ? { background: "#f1f6f8" } : { background: "white" }} >
                  {
                    columns.map((column) => {
                      const value = rowData[column.id];
                      var avatar = false;
                      var previ = false;
                      if (column.id === 'name') avatar = true
                      if (column.id === 'enprevi') { previ = true }
                      return (
                        avatar ? <TableCell key={column.id}>
                          <Grid container>
                            <Grid item lg={2}>
                              {/* <Avatar alt={value} src='.' className={classes.avatar}/> */}
                              {/* style={{backgroundColor: randomColor()}}  className={classes.avatar}*/}
                              <Avatar {...stringAvatar(rowData.name)} />
                            </Grid>
                            <Grid item lg={10} style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography className={classes.name} >{value}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell> :
                          previ ? <TableCell key={column.id}>

                            <Tooltip title="Add Previleges" placement='top' arrow>
                              <span><PendingIcon style={{ color: '#808000', fontSize: '30px' }} className={classes.tooltip} onClick={MenuPrevilege} /></span>
                            </Tooltip>
                          </TableCell> :
                            <TableCell key={column.id}>{value}</TableCell>

                      )
                    })
                  }
                  <TableCell>
                    <Tooltip title="View" placement='top' arrow onClick={() => view(rowData)}>
                      <span><PersonIcon style={{ color: 'green', fontSize: '30px' }} className={classes.tooltip} /></span>
                    </Tooltip>
                    <Tooltip title="Edit" placement='top' arrow onClick={() => edit(rowData)}>
                      <span><EditIcon style={{ color: 'orange', fontSize: '30px' }} className={classes.tooltip} /></span>
                    </Tooltip>
                    <Tooltip title="Delete" placement='top' arrow onClick={() => deleteAction(rowData)} >
                      <span><DeleteIcon style={{ color: "red", fontSize: '30px' }} className={classes.tooltip} /></span>
                    </Tooltip>
                  </TableCell>
                  {
                    userColumn && <TableCell ><SupervisedUserCircleIcon style={{ fontSize: '38px', color: '#1976d2', cursor: 'pointer' }} onClick={() => navigate('/role/users', { state: { selectedRole: rowData.name } })} /></TableCell>
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={datas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}

export default MTable;