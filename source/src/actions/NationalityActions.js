import dispatcher from "../appDispatcher";
import axios from "axios";
export const LOAD_STUDENT_NATIONALITY_STARTED =
  "LOAD_STUDENT_NATIONALITY_STARTED";
export const LOAD_STUDENT_NATIONALITY_SUCCESS =
  "LOAD_STUDENT_NATIONALITY_SUCCESS";
export const LOAD_STUDENT_NATIONALITY_ERROR = "LOAD_STUDENT_NATIONALITY_ERROR";
export const LOAD_NATIONALTIES_STARTED = "LOAD_NATIONALTIES_STARTED";
export const LOAD_NATIONALTIES_SUCCESS = "LOAD_NATIONALTIES_SUCCESS";
export const LOAD_NATIONALTIES_ERROR = "LOAD_NATIONALTIES_ERROR";
// UPDATE NATIONALITY
export const UPDATE_STUDENT_NAT_STARTED = "UPDATE_STUDENT_NAT_STARTED";
export const UPDATE_STUDENT_NAT_SUCCESS = "UPDATE_STUDENT_NAT_SUCCESS";
export const UPDATE_STUDENT_NAT_ERROR = "UPDATE_STUDENT_NAT_ERROR";
// UPDATE FAMILY NATIONALITY
export const UPDATE_FAMILY_NAT_STARTED = "UPDATE_FAMILY_NAT_STARTED";
export const UPDATE_FAMILY_NAT_SUCCESS = "UPDATE_FAMILY_NAT_SUCCESS";
export const UPDATE_FAMILY_NAT_ERROR = "UPDATE_FAMILY_NAT_ERROR";

// BASE URL
const BASE_URL = "http://localhost:8088";
// get nationality of student
export function getStudentNationality(studentId) {
  dispatcher.dispatch({ type: LOAD_STUDENT_NATIONALITY_STARTED });
  axios
    .get(`${BASE_URL}/api/Students/${studentId}/Nationality/`)
    .then((response) => {
      dispatcher.dispatch({
        type: LOAD_STUDENT_NATIONALITY_SUCCESS,
        payload: response?.data?.nationality ?? null,
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: LOAD_STUDENT_NATIONALITY_ERROR,
        payload: error,
      });
    });
}
export function getNationalities() {
  dispatcher.dispatch({ type: LOAD_NATIONALTIES_STARTED });
  axios
    .get(`${BASE_URL}/api/Nationalities`)
    .then((response) => {
      dispatcher.dispatch({
        type: LOAD_NATIONALTIES_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: LOAD_NATIONALTIES_ERROR,
        payload: error,
      });
    });
}
export function updateStudentNationality(studentId, natId) {
  dispatcher.dispatch({ type: UPDATE_STUDENT_NAT_STARTED });
  axios
    .put(`${BASE_URL}/api/Students/${studentId}/Nationality/${natId}`)
    .then((response) => {
      dispatcher.dispatch({
        type: UPDATE_STUDENT_NAT_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: UPDATE_STUDENT_NAT_ERROR,
        payload: error,
      });
    });
}
export function updateFamilyNationality(memberId, natId) {
  dispatcher.dispatch({ type: UPDATE_FAMILY_NAT_STARTED });
  axios
    .put(`${BASE_URL}/api/FamilyMembers/${memberId}/Nationality/${natId}`)
    .then((response) => {
      dispatcher.dispatch({
        type: UPDATE_FAMILY_NAT_SUCCESS,
        payload: response?.data ?? [],
      });
    })
    .catch((error) => {
      dispatcher.dispatch({
        type: UPDATE_FAMILY_NAT_ERROR,
        payload: error,
      });
    });
}
