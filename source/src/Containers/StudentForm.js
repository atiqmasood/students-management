import React, { useEffect, useState } from "react";
import moment from "moment";
// MUI
import Button from "@mui/material/Button";
import MuiModal from "../Components/MuiModal";
// CORE
import PersonalInfo from "../Components/Student/PersonalInfo";
import FamilyInfo from "../Components/Student/FamilyInfo";
import NationalityStore from "../store/NationalityStore";
import FamilyStore from "../store/FamilyStore";
import {
  getStudentNationality,
  updateStudentNationality,
  updateFamilyNationality,
} from "../actions/NationalityActions";
import {
  getStudentFamily,
  addStudentFamily,
} from "../actions/FamilyInfoActions";
import {
  addStudent,
  getStudentsList,
  updateStudent,
} from "../actions/StudentAction";

export default function StudentForm({
  toggleModal,
  isOpen,
  selectedStudent,
  currentStudentNat,
  isEditDisabled,
}) {
  const [state, setState] = useState({
    familyList: [],
    formValues: {},
  });
  const { familyList, formValues } = state;
  const id = selectedStudent?.ID;

  useEffect(() => {
    NationalityStore.addChangeListener(mapStore);
    FamilyStore.addChangeListener(mapStore);

    return () => {
      NationalityStore.removeChangeListener(mapStore);
      FamilyStore.removeChangeListener(mapStore);
    };
  }, []);

  useEffect(() => {
    if (id !== getStoreState()?.nationality?.ID) {
      id && getStudentNationality(id);
      id && getStudentFamily(id);
    }
    setState({ ...state, formValues: selectedStudent });
  }, [id, selectedStudent]);
  // map store with state
  function mapStore() {
    setState((prevState) => ({
      ...prevState,
      familyList: id ? getStoreState()?.familyList : familyList,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "nationality") {
      const val = getStoreState()?.nationalities?.filter(
        (n) => n.ID === value
      )?.[0];
      setState({ ...state, formValues: { ...formValues, [name]: val } });
      return;
    }
    setState({ ...state, formValues: { ...formValues, [name]: value } });
  }
  // on change family member
  function changeFamilyMember(e, member, selectedIndex, isDelete = false) {
    let updatedRecord = familyList?.length > 0 ? familyList : [];
    if (isDelete) {
      updatedRecord = updatedRecord?.filter((m, i) => i !== selectedIndex);
    } else {
      if (selectedIndex !== null && selectedIndex >= 0) {
        updatedRecord[selectedIndex] = member;
      } else {
        updatedRecord.push(member);
      }
    }
    setState({ ...state, familyList: updatedRecord });
  }
  // add student
  function onSumbit(e) {
    let { dateOfBirth, firstName, lastName, nationality } = formValues;
    dateOfBirth = dateOfBirth ? moment(dateOfBirth).format() : null;
    let studentBasicInfo = { dateOfBirth, firstName, lastName };
    if (id) {
      updateStudent(id, studentBasicInfo);
      nationality?.ID && updateStudentNationality(id, nationality?.ID);
      getStudentsList();
      toggleModal(e);
    } else {
      addStudent(studentBasicInfo).then((res) => {
        if (res?.isSuccess) {
          nationality?.ID &&
            updateStudentNationality(res?.data?.ID, nationality?.ID);
          submitFamilyMembers(res?.data?.ID);
          getStudentsList();
          toggleModal(e);
        }
      });
    }
  }

  // add family members
  function submitFamilyMembers(stId) {
    if (familyList?.length > 0) {
      familyList.forEach((item) => {
        let { relationship, firstName, lastName, nationality } = item;
        addStudentFamily(stId, { relationship, firstName, lastName }, (id) =>
          addFamilyCallback(id, nationality?.ID)
        );
      });
    }
  }
  function addFamilyCallback(familyId, natId) {
    if (familyId) {
      updateFamilyNationality(familyId, natId);
    }
  }
  console.log("isEditDisabled", isEditDisabled);
  return (
    <MuiModal
      maxWidth={"md"}
      title={`${id ? "Edit" : "Add"} Student Form`}
      toggleModal={toggleModal}
      isOpen={isOpen}
      footer={
        <React.Fragment>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={toggleModal}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            onClick={onSumbit}
            disabled={isEditDisabled}
          >
            Submit
          </Button>
        </React.Fragment>
      }
    >
      <h3>Personal Info</h3>
      <PersonalInfo
        selectedStudent={{ ...selectedStudent, ...formValues }}
        currentStudentNat={formValues?.nationality ?? currentStudentNat}
        isEdit={id ? true : false}
        onChange={handleChange}
        isEditDisabled={isEditDisabled}
      />
      <FamilyInfo
        familyList={familyList}
        isEdit={id ? true : false}
        nationalities={getStoreState()?.nationalities}
        onAddEditMember={changeFamilyMember}
        selectedStudent={selectedStudent}
        isEditDisabled={isEditDisabled}
      />
    </MuiModal>
  );
}
// Method to retrieve state from Stores
const getStoreState = () => ({
  familyList: FamilyStore.getStore()?.familyList,
  nationality: NationalityStore.getStore()?.studentNationality,
  nationalities: NationalityStore.getStore()?.nationalities,
});
