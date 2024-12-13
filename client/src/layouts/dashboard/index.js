/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { BookTable } from "./components/Tables/BookTable";
import { AuthorsTable } from "./components/Tables/AuthorsTable";

function Dashboard() {
  const [authors, setAuthors] = useState([]);
  const { sales, tasks } = reportsLineChartData;
  const [booksCount, setBooksCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    fetchTablePagesAndBooks();
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    await fetch("http://localhost:8080/api/authors")
      .then((data) => data.json())
      .then((res) => {
        setAuthors(res);
      });
  };

  const fetchTablePagesAndBooks = async () => {
    await fetch(`http://localhost:8080/api/books/${12}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(res.pageCount);
        setBooksCount(res.booksCount);
        setPagesCount(res.pageCount);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Dummy graph"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Second dummy graph"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox mb={6.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Books"
                  count={booksCount}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Books in library right now",
                  }}
                />
              </MDBox>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Authors"
                  count={authors.length}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Authors in our library",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox>
        <BookTable
          authors={authors}
          refetchTablePagesAndBooks={fetchTablePagesAndBooks}
          pagesCount={pagesCount}
        ></BookTable>
      </MDBox>
      <MDBox mt={3}>
        <MDBox mt={3}>
          <AuthorsTable rows={authors}></AuthorsTable>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
