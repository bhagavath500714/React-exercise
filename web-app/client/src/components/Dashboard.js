import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import useTable from '../hooks/useTable'
import { TableBody, TableCell, TableRow, Paper } from '@mui/material';
import * as employeeService from '../services/employeeServices';
import { makeStyles } from '@mui/styles';

const headCells = [
  { id: 'fullName', label: 'Employee Name' },
  { id: 'email', label: 'Email Address (Personal)' },
  { id: 'mobile', label: 'Mobile Number' },
  { id: 'department', label: 'Department'},
]

const useStyles = makeStyles(theme => ({
  root: {
      padding: theme.spacing(2)
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  const [records, setRecords] = useState([])
  const { TblContainer, TblHead } = useTable(records, headCells);

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

  return (
    <>
      <PageHeader title="New Employee" subTitle="Form design with validation" icon={<PeopleOutlineOutlinedIcon fontSize="large" />} />
      <Paper elevation={0} square className={classes.root}>
      <TblContainer>
        <TblHead />
        <TableBody>
          {records.map(item => (<TableRow key={item.id}>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.mobile}</TableCell>
            <TableCell>{item.department}</TableCell>
          </TableRow>))}
        </TableBody>
      </TblContainer>
    </Paper>
    </>
  )
}
