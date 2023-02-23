import React, { useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import { getAllOrderListStart } from '../Redux/Actions/ordersActions';
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Barcode from 'react-barcode';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const DesignersOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = useState("");
    useEffect(() => {
        dispatch(getAllOrderListStart());
      }, []);

    const classes = useStyles();
    const dispatch = useDispatch();
    const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);
    const [data , setData] = useState(orderListData)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const requestSearch = (searchedVal) => {
      const filteredRows = orderListData.filter((row) => {
        // console.log('ROWS~~~~>>', row.line_items)
        return row.line_items?.map((item) => {
          item.name?.toLowerCase().includes(searchedVal.toLowerCase())
        })
      });
      console.log('SEARCH~~~~>>', filteredRows)
      setData(filteredRows)
      // setRows(filteredRows);
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
         <h4 class="fw-bold py-3 mb-4">All Order</h4>
        <div class="card mb-4">
             <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Orders List</h5>
               
              </div>
              <SearchBar
                           value={searched}
                           onChange={(searchVal) => requestSearch(searchVal)}
                           onCancelSearch={() => cancelSearch()}
                    />
              <div class="card-body">
                <div class="table-responsive text-nowrap">
          <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order Number</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Barcode</TableCell>
                <TableCell align="left">Submit</TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((orderList) => {
                return (
                <TableRow >
                  <TableCell component="th" scope="row">{orderList.order_number}</TableCell>
                  {orderList?.line_items?.map((items) => (
                    <TableCell align="left"  
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding:'8%',
                    }}>{items.name}</TableCell>
                  ))}
                  <TableCell align="left">{orderList.line_items[0]?.properties?.map((items) => {
                    if(items?.name === 'key'){
                      return (

                        <TableCell class='bg-label-success'>{items?.value}</TableCell>
                      )
                    }
                  })}
                  </TableCell>
                  <TableCell align="left">
                  <Barcode value={`${orderList?.order_number}`} 
                                            width={1}
                                            height={25}
                                            displayValue={false}
                                            format={'CODE128'}
                                            background= {"#ffffff"}
                                            lineColor= {"#000000"}
                                            margin={0}
                                           
                                        />
                  </TableCell>
                  <TableCell>{`submit`}</TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orderListData && orderListData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                  {/* <table class="table">
                    <thead>
                      <tr>
                        <th>
                          <b>Order Number</b>
                        </th>
                        <th>
                          <b>Image</b>
                        </th>
                        <th>
                            <b>Status</b>
                        </th>
                        <th>
                          <b>barcode</b>
                        </th>
                        <th>
                          <b>Submit</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      {orderListData
                        ? orderListData?.map((orderList) => {
                            return (
                              <>
                                <tr class="table-light">
                                 
                                  <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                    <strong>{orderList?.order_number}</strong>
                                  </td>
                                  {orderList?.line_items?.map((data) => {
                                      return (
                                        <td
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          {data?.name}
                                        </td>
                                      );
                                    })}
                                  <td>
                                      {orderList?.line_items[0]?.properties.map(
                                        (items) => {
                                          if (items?.name === "key") {
                                            return (
                                                <td class='bg-label-success'>{items.value}</td>
                                            );
                                          }
                                        }
                                      )}
                                   </td>
                                  <td>
                                    <>
                                        <Barcode value={`${orderList?.order_number}`} 
                                            width={1}
                                            height={25}
                                            displayValue={false}
                                            format={'CODE128'}
                                            background= {"#ffffff"}
                                            lineColor= {"#000000"}
                                            margin={0}
                                           
                                        />
                                    </>
                                  </td>
                                  <td>{`submit`}</td>
                                </tr>
                              </>
                            );
                          })
                        : null}
                    </tbody>
                  </table> */}
                </div>
              </div>
        </div>
        </div>
    </>
  )
}
