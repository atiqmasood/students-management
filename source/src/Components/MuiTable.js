import React from "react";
// @material-ui/core components
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import MuiLoader from "./MuiLoader";

const StyledCell = styled(TableCell)`
  background: #cbd5f1 !important;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
`;
const LoaderWrapper = styled.div`
  justify-content: center;
  display: flex;
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});

export default function MuiTable({ columns, data, onRowClicked, isLoading }) {
  const classes = useStyles();

  const handleRowSelect = (e, selectedRow) => {
    if (onRowClicked) {
      onRowClicked(e, selectedRow);
    }
  };

  if (isLoading) {
    return (
      <LoaderWrapper>
        <MuiLoader />
      </LoaderWrapper>
    );
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          {columns !== undefined ? (
            <TableHead>
              <TableRow>
                {columns.map((headerItem, index) => (
                  <StyledCell
                    style={{ minWidth: headerItem?.width }}
                    key={index}
                  >
                    {headerItem.title}
                  </StyledCell>
                ))}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={(e) => handleRowSelect(e, item)}
                >
                  {columns.map((col, trKey) => (
                    <TableCell key={trKey}>
                      {col.render ? col.render(item, trKey) : item?.[col?.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No record found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
