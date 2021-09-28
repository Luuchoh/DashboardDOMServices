import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
} from "@coreui/react";
import axios from "axios";

import ChartLineSimple from "../charts/ChartLineSimple";

const WidgetsDropdown = () => {

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const {data} = await axios.get(
          "https://dom-service-api.herokuapp.com/api/v1/services/?all=true"
        );
        setServices(data.docs)
      } catch (error) {
        console.log(error);
      }
      try {
        const {data} = await axios.get(
          "https://dom-service-api.herokuapp.com/api/v1/users/?all=true"
        );
        setUsers(data.docs)
      } catch (error) {
        console.log(error);
      }
    };

    data();
  }, []);

  // render
  return (

    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={users.length}
          text="Usuarios Registrados"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 3, 6, 7, 10]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={services.length}
          text="Servicios Registrados"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 2]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
