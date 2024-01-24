/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import { format } from 'date-fns';

import { useState, useEffect } from 'react';


export default function data() {
  const [metrics, setMetrics] = useState([]);
  

  useEffect(() => {
    console.log("using token "+localStorage.getItem("idToken"))

    fetch('https://hmrwpbq0v2.execute-api.eu-west-2.amazonaws.com/test/metrics',{
      headers:{
        'Content-Type' : 'application/json',
        Authorization: localStorage.getItem("idToken")
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMetrics(data['metrics']);
      });
  }, []);


  return {
    columns: [
      { Header: "metric", accessor: "metric", width: "45%", align: "left" },
      { Header: "value", accessor: "value", align: "left" },
      { Header: "date", accessor: "date", align: "center" },
    ],

    rows: metrics.map((metric) => (
     {
      metric: (   
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {metric.metricType}
      </MDTypography>
    ),
    value: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
       {metric.value}
      </MDTypography>
    ),
    date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        { format(new Date(metric.timestamp), 'MMMM do yyyy, h:mm:ss a') }
      </MDTypography>
    )
    }

    
    )
  )
        ,
  };

}

