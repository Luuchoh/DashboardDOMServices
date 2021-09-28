import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import { findServices } from "src/redux/actions/serviceActions";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Servicos = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.services)
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/services?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(findServices())
  }, [dispatch, currentPage, page]);

  const pagUser = () => {
    if(services.length%5 !== 0){
      return Math.round(services.length/5 + .4)
    }else{
      return services.length/5
    }
  }
  const paginas = pagUser();

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Usuarios</CCardHeader>
          <CCardBody>
            <CDataTable
              items={services}
              fields={[
                { key: "title", label:'Servicio' ,_classes: "font-weight-bold" },
                { key:"description", label:'Descripcion'},
                { key:"location", label:'Ubicación'},
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/services/${item._id}`)}
              scopedSlots={{
                delete: (item) => (
                  <td>
                    <CBadge color={getBadge(item.delete ? `Active`: `Inactive`)}>{item.delete}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={paginas}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Servicos;
