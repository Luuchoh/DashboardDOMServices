import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CRow,
  CCardFooter,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CForm,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newCategory } from "src/redux/actions/categoriesActions";
import { useHistory } from "react-router";

const AddCategory = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Categoria requerida")
    }),
    onSubmit: () => {
      dispatch(newCategory(formik.values));
      history.push('/categories/current-categories')
    },
  });

  const { name } = formik.values;

  return (
    <>
      <CRow className="m-auto justify-content-center">
        <CCol xs="12" sm="6">
          <CCard>
            <CForm onSubmit={formik.handleSubmit}>
              <CCardHeader>Agregar nueva categoria</CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-puzzle" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='text'
                        id="name"
                        name="name"
                        placeholder="Nueva categoria"
                        value={name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="w-100 text-danger">
                          {formik.errors.name}
                        </p>
                      ) : null}
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="m" color="primary">
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
                <CButton type="reset" size="m" color="danger">
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddCategory;
