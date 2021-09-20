import { addCategory, getCategories } from "../../services/categories";
import { types } from "../types/types";

export const findCategories = () => {
  return (dispatch) => {
    getCategories().then((categories) => {
      dispatch({
        type: types.getCategories,
        payload: categories,
      });
    });
  };
};
export const newCategory = (newCategory) => {
  return (dispatch) => {
    addCategory(newCategory)
      .then((categories) => {
        console.log(categories);
        dispatch({
          type: types.addCategories,
          payload: categories,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
