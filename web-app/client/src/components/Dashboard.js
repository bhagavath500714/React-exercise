import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import useTable from '../hooks/useTable'
import { TableBody, TableCell, TableRow, Paper, Toolbar, InputAdornment } from '@mui/material';
import * as employeeService from '../services/employeeServices';
import { makeStyles } from '@mui/styles';
import Controls from '../controls/Controls';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../hooks/Popup';

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department', disableSorting: true },
]

const useStyles = makeStyles(theme => ({
  root: {
      padding: theme.spacing(2)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute !important',
    right: 0
  },
  toolSpacing: {
    padding: '0 !important'
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({fn: items => { return items; }})
  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    employeeService.getAllUsers().then((res) => {
      console.log('res--', res);
      if (res.data.success === 1) {
        let employees = res.data.data;
        let departments = employeeService.getDepartmentCollection();
       const newVal = employees.map(x => ({
          ...x, department: departments[x.department - 1].title
        }))
        setRecords(newVal);
      }
    })
  }

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
        return items;
        else
        return items.filter(x => x.fullName.toLowerCase().includes(target.value))
      }
    })
  }

  return (
    <>
      <PageHeader title="New Employee" subTitle="Form design with validation" icon={<PeopleOutlineOutlinedIcon fontSize="large" />} />
      <Paper elevation={0} square className={classes.root}>
        <Toolbar className={classes.toolSpacing}>
        <Controls.Input label="Search Employees" className={classes.searchInput} 
            InputProps = {{
                startAdornment:(<InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>)
              }}
              onChange={handleSearch}
          />
          <Controls.Button text="Add New" variant="outlined" startIcon = {<AddIcon />} className={classes.newButton} onClick={() => setOpenPopup(true)}/>
        </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map(item => (<TableRow key={item.id}>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.mobile}</TableCell>
            <TableCell>{item.department}</TableCell>
          </TableRow>))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    <Popup title="Employee Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
    </Popup>
    </>
  )
}
