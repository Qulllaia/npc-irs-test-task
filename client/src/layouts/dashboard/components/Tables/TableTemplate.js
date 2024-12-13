/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export const TableTemplate = ({ children, name }) => {
  return (
    <MDBox pb={3}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            {name}
          </MDTypography>
        </MDBox>
        {children}
      </Card>
    </MDBox>
  );
};
