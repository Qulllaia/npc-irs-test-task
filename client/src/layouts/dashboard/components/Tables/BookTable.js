/* eslint-disable react/prop-types */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Pagination } from "@mui/material";

import { CustomDialog } from "components/CustomDialog";
import { TableTemplate } from "./TableTemplate";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

let allOfTheData = [];
export const BookTable = ({
  authors,
  refetchTablePagesAndBooks,
  pagesCount,
}) => {
  const limit = 100;
  const gridRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [colDefs, setColDefs] = useState([
    { field: "author", flex: 1 },
    { field: "book_name", flex: 1 },
    { field: "pages", flex: 1 },
    { field: "price", flex: 1 },
    { field: "publication", flex: 1 },
  ]);

  useEffect(() => {
    refetchTablePagesAndBooks();
  }, [allOfTheData]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const postBook = async (formJson) => {
    await fetch("http://localhost:8080/api/books", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    })
      .then((res) => res.json())
      .then((output) => {
        if (output.message) console.log(output);
        else {
          insertItem(output[0]);
          refetchTablePagesAndBooks();
          handleClose();
        }
      });
  };

  const deleteBook = async (id) => {
    await fetch(`http://localhost:8080/api/books/${id}`, {
      method: "delete",
    }).then((data) => data.json());
  };

  const datasource = useMemo(() => {
    return {
      rowCount: undefined,
      getRows: (params) => {
        const rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
        let lastRow = allOfTheData.length;
        params.successCallback(rowsThisPage, lastRow);
      },
    };
  });

  const onGridReady = useCallback((params) => {
    fetch(`http://localhost:8080/api/books/0&${limit}`)
      .then((resp) => resp.json())
      .then((data) => {
        allOfTheData = [];
        allOfTheData = data.map((el) => ({
          id: el.id,
          author: `${el.name} ${el.surname}`,
          book_name: el.book_name,
          pages: el.pages,
          price: `${el.price}$`,
          publication: el.publication.split("T")[0],
          author_id: el.author_id,
        }));
      })
      .then(() => {
        params.api.setGridOption("datasource", datasource);
      });
  }, []);

  const editBook = async (formJson) => {
    console.log(formJson);
    await fetch(
      `http://localhost:8080/api/books/${
        gridRef.current.api.getSelectedNodes()[0].data.id
      }`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJson),
      }
    )
      .then((res) => res.json())
      .then((output) => {
        if (output.message) console.log(output);
        else {
          setIsEditing(false);
          handleClose();
          editItem(output[0]);
        }
      });
  };

  const rowSelection = useMemo(() => {
    return {
      mode: "singleRow",
    };
  }, []);

  const insertItem = useCallback(
    (newRowData) => {
      gridRef.current.api.deselectAll();
      const enteredAuthorId = newRowData.author_id;
      newRowData.publication = newRowData.publication.split("T")[0];
      newRowData.author = `${authors[Number(enteredAuthorId) - 1].name} ${
        authors[Number(enteredAuthorId) - 1].surname
      }`;
      const maxRowFound = gridRef.current.api.isLastRowIndexKnown();
      if (maxRowFound) {
        const rowCount = gridRef.current.api.getDisplayedRowCount() || 0;
        allOfTheData.splice(rowCount, 0, newRowData);
        gridRef.current.api.setRowCount(rowCount + 1);
      } else allOfTheData.splice(1, 0, newRowData);

      gridRef.current.api.refreshInfiniteCache();
    },
    [allOfTheData]
  );

  const editItem = useCallback(
    (newRowData) => {
      const enteredAuthorId = newRowData.author_id;
      newRowData.publication = newRowData.publication;
      newRowData.author = `${authors[Number(enteredAuthorId) - 1].name} ${
        authors[Number(enteredAuthorId) - 1].surname
      }`;
      const selectedNodeId = gridRef.current.api.getSelectedNodes()[0].rowIndex;
      allOfTheData[selectedNodeId] = newRowData;
      gridRef.current.api.refreshInfiniteCache();
    },
    [allOfTheData]
  );

  const removeItem = useCallback(
    (start, limit) => {
      allOfTheData.splice(start, limit);
      gridRef.current.api.refreshInfiniteCache();
    },
    [allOfTheData]
  );
  return (
    <>
      <TableTemplate name={"Books table"}>
        <MDBox mt={3}>
          <MDBox ml={2}>
            <MDButton
              onClick={() => {
                handleClickOpen();
              }}
            >
              Add
            </MDButton>
            <MDButton
              margin={10}
              onClick={() => {
                const selectedNode = gridRef.current.api.getSelectedNodes()[0];
                if (selectedNode) {
                  removeItem(selectedNode.rowIndex, 2);
                  deleteBook(selectedNode.data.id).then(() => {
                    refetchTablePagesAndBooks();
                  });
                }
              }}
            >
              Delete
            </MDButton>
            <MDButton
              mr={1}
              onClick={() => {
                if (gridRef.current.api.getSelectedNodes().length > 0) {
                  console.log(gridRef.current.api.getSelectedNodes()[0]);
                  setIsEditing(true);
                  handleClickOpen();
                }
              }}
            >
              Edit
            </MDButton>
          </MDBox>
          <div
            className="ag-theme-quartz"
            style={{
              flexGrow: 1,
              height: 300,
              marginLeft: 16,
              marginRight: 16,
            }}
          >
            <AgGridReact
              ref={gridRef}
              columnDefs={colDefs}
              rowModelType={"infinite"}
              rowSelection={rowSelection}
              cacheBlockSize={5}
              pagination={true}
              paginationPageSize={12}
              suppressPaginationPanel={true}
              onGridReady={onGridReady}
            />
          </div>
          <MDBox mb={1} ml={1}>
            <Pagination
              count={pagesCount}
              onChange={(el) => {
                gridRef.current.api.paginationGoToPage(
                  Number(el.target.innerText) - 1
                );
              }}
            ></Pagination>
          </MDBox>
        </MDBox>
      </TableTemplate>

      <CustomDialog
        handleClose={handleClose}
        bookAction={isEditing ? editBook : postBook}
        authors={authors}
        open={open}
        prevData={
          isEditing ? gridRef.current.api.getSelectedNodes()[0].data : null
        }
      />
    </>
  );
};
