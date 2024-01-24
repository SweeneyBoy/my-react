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
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";

// Data
// import myDataTableData from "layouts/tables/data/myDataTableData";

function Metrics() {

  const [metricType, setMetricType] = useState('');
  const [metricValue, setMetricValue] = useState('');


  // const { columns: myDataColumns, rows: myDataRows } = myDataTableData();

  const clearForm = () => {
    setMetricType("");
    setMetricValue("");
  }
  const handleClick = () => {

    console.log("using token "+localStorage.getItem("idToken"))

    fetch('https://hmrwpbq0v2.execute-api.eu-west-2.amazonaws.com/test/metrics',{
      method : 'POST',
      headers:{
        'Content-Type' : 'application/json',
        Authorization: localStorage.getItem("idToken")
      },
      body: JSON.stringify({metric:{ metricType: metricType,value: metricValue, timestamp: Date.now()}})
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setMetrics(data);
        clearForm();
      });

  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
       
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="string" label="Metric type"  value={metricType} onChange={(e) => setMetricType(e.target.value)}
              />
            {/* </MDBox>
            <MDBox mb={2}> */}
              <MDInput type="number" label="value" value={metricValue}
              onChange={(e) => { setMetricValue( e.target.value) }}
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleClick}>
                save this metric
              </MDButton>
            </MDBox>
            
          </MDBox>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Metrics;
