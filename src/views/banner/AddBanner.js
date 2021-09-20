import React, { useState } from "react";
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

const AddBanner = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <CRow className="m-auto justify-content-center">
        <CCol xs="12" sm="6">
          <CCard>
            <CForm noValidate validated={validated} onSubmit={handleSubmit}>
              <CCardHeader>Agregar nueva banner</CCardHeader>
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
                        type='email'
                        id="input1-group1 "
                        name="input1-group1"
                        placeholder="Nueva banner"
                        required
                      />
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

export default AddBanner;
