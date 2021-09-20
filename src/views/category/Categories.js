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

import { findCategories } from "../../redux/actions/categoriesActions";

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

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories)
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/categories/actual-categories?page=${newPage}`);
  };


  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    dispatch(findCategories())
  }, [dispatch, currentPage, page]);

  return (
    <CRow className="justify-content-center">
      <CCol xl={7}>
        <CCard>
          <CCardHeader>Categorias</CCardHeader>
          <CCardBody>
            <CDataTable
              items={categories}
              fields={[
                { key: "name", label:'Nombre' ,_classes: "font-weight-bold" },
                { key:"delete", label:'Estado'},
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/categories/actual-categories/${item._id}`)}
              scopedSlots={{
                delete: (item) => (
                  <td>
                    <CBadge color={getBadge( item.delete ? 'Active': 'Inactive')}>{item.delete}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={categories.length/5 < 1 ? 1 : categories.length/5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Categories;
