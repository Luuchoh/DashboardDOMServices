import Swal from "sweetalert2";
import { types } from "../types/types";
import { FileUpload } from "../../helpers/FileUpload";
import { login as authLogin } from "../../services/auth";
let fileUrl = [];

//ENVIA LA IMAGEN A CLOUDINARY Y LA SUBE
export const startUploadingImage = (file) => {
  return async () => {
    Swal.fire({
      title: "Uploading...",
      text: "Please wait ...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    fileUrl = await FileUpload(file);

    Swal.close();
    return fileUrl;
  };
};
//INICIA SESION CON CORREO Y CONTRASEÑA
export const startLoginEmailPassword = (email, password, remenber) => {
  return (dispatch) => {
    authLogin({ email, password, remenber })
      .then((user) => {
        if(user.userType === 'ADMIN'){
        dispatch(login(user));
        }else{
          Swal.fire({
            icon: "error",
            title: "Error ...",
            text: "Lo sentimos no puedes ingresar con este usuario",
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Error ...",
          text: e,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
      });
  };
};

//FUNCION SINCRONICA(GUARDA INFO DE USUARIO EN REDUCER)
export const login = (user) => {
  const { id, imageUrl } = user;
  return {
    type: types.login,
    payload: {
      id: id,
      imageUrl: user.photoURL || imageUrl,
      isAuthenticated: true,
    },
  };
};

//CIERRA SESION
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logOutReducer());
  };
};

//CIERRA SESION EN REDUX FUNCION SINCRONICA
export const logOutReducer = (user) => {
  return {
    type: types.logout,
  };
};
