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
import RegistartionForm from './register/RegistartionForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Notification from '../hooks/Notification';

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department'},
  { id: 'actions', label: 'Actions', disableSorting: true  }
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
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    employeeService.getAllUsers().then((res) => {
      console.log('res--', res);
      if (res.data.success === 1) {
        console.log('new-user')
        let employees = res.data.data;
        let departments = employeeService.getDepartmentCollection();
        const newVal = employees.map(x => ({
          ...x, department: departments[x.department - 1]?.title
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

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.userRegisteration(employee).then((res) => {
          //  console.log('res--', res);
          if (res.data.success === 1) {
            console.log('registered successfully');
            resetForm();
            setOpenPopup(false);
            getUsers();
                 setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
          })
          }
        })
      }
      else {
        console.log ('-----update----', employee);
        employeeService.updateUsers(employee).then((res) => {
          // console.log('res--', res);
          if (res.data.success === 1) {
            console.log('Updated successfully');
            setOpenPopup(false);
            getUsers();
                 setNotify({
            isOpen: true,
            message: 'Updated Successfully',
            type: 'info'
          })
          }
        })
      }
  }

  const openInPopup = item => {
    console.log('---item--', item);
    
    setRecordForEdit(checkDept(item))
    setOpenPopup(true)
  }

  const checkDept = (item) => {
    // console.log('------elemnet--', element);
    
    switch(item.department){
      case "Development":
      return {
        ...item,
        department: '1',
      }  
      case "Marketing":
        return {
          ...item,
          department: '2',
        } 
        case "Accounting":
          return {
            ...item,
            department: '3',
          } 
          case "HR":
            return {
              ...item,
              department: '4',
            } 
      default:
        return item;
    }
  }
  
  const onDelete = id => {
    console.log('--------------------dellll', id);
    employeeService.deleteUsers(id).then((res) => {
      if (res.data.success === 1) {
        console.log('deleted successfully');
        getUsers();
        setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'success'
      })
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
            <TableCell>
                    <Controls.ActionButton color="primary" onClick = {() => {openInPopup(item)}}>
                        <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary" onClick = {() => {onDelete(item.id)}}>
                        <DeleteOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
          </TableRow>))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    <Popup title="Employee Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
      <RegistartionForm openPopup={openPopup} addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
    </Popup>
    <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}
