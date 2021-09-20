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

import profile from "../../redux/actions/userActions";

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

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };


  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(profile.findAllUser())
  }, [dispatch, currentPage, page]);

  console.log(Math.round(users.length/5 + .4));

  const pagUser = () => {
    if(users.length%5 !== 0){
      return Math.round(users.length/5 + .4)
    }else{
      return users.length/5
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
              items={users}
              fields={[
                { key: "displayName", label:'Nombre' ,_classes: "font-weight-bold" },
                { key:"email", label:'Correo'},
                { key:"userType", label:'Rol'},
                { key:"delete", label:'Estado'},
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item._id}`)}
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

export default Users;
