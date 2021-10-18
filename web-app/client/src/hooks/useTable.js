import React from 'react';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: '#253052',
      backgroundColor: '#757de81f',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#eeeffc2e',
      cursor: 'pointer',
    },
  },
}))

export default function useTable(redords, headCells) {
  const classes = useStyles();

  const TblContainer = props => (
    <Table className={classes.table}>
      {props.children}
    </Table>
  )

  const TblHead = props => {
    return (<TableHead>
      <TableRow>
        {
          headCells.map(headCell => (<TableCell key={headCell.id}>
              {headCell.label}
          </TableCell>))
        }
      </TableRow>
    </TableHead>)
  }

  return {
    TblContainer,
    TblHead
  }
}
