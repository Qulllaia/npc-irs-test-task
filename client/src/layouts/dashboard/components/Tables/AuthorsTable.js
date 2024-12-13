/* eslint-disable react/prop-types */

import { TableTemplate } from "./TableTemplate";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

export const AuthorsTable = ({ rows }) => {
  const [colDefs, setColDefs] = useState([
    { field: "id", flex: 1 },
    { field: "name", flex: 1 },
    { field: "surname", flex: 1 },
  ]);
  return (
    <TableTemplate name={"Authors table"}>
      <div
        className="ag-theme-quartz"
        style={{
          flexGrow: 1,
          height: 300,
          margin: 16,
        }}
      >
        <AgGridReact columnDefs={colDefs} rowData={rows}></AgGridReact>
      </div>
    </TableTemplate>
  );
};
