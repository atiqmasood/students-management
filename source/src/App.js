import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// CORE
import StudentForm from "./Containers/StudentForm";
import { getStudentsList } from "./actions/StudentAction";
import studentStore from "./store/StudentStore";
import NationalityStore from "./store/NationalityStore";
import MuiDropdown from "./Components/MuiDropdown";
import MuiTable from "./Components/MuiTable";

const SelectWrapper = styled.div`
  padding: 2rem 0;
`;
const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`;

function App() {
  const [state, setState] = useState({
    isAdd: false,
    isLoading: false,
    studentList: [],
    nationalities: [],
    selectedStudent: null,
    nationality: null,
    activeRoleId: 0,
  });
  const {
    studentList,
    isAdd,
    isLoading,
    selectedStudent,
    nationality,
    nationalities,
    activeRoleId,
  } = state;
  const tableColumns = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    {
      title: "Date of Birth",
      key: "dateOfBirth",
      render: ({ dateOfBirth }) =>
        dateOfBirth ? moment(dateOfBirth).format("DD-MMM-YYYY") : "",
    },
  ];

  // load students
  useEffect(() => {
    studentStore.addChangeListener(getStudents);
    NationalityStore.addChangeListener(getStudents);
    getStudentsList();
    return () => {
      studentStore.removeChangeListener(getStudents);
      NationalityStore.removeChangeListener(getStudents);
    };
  }, []);
  // map store with state
  function getStudents() {
    setState((prevState) => ({
      ...prevState,
      studentList: getStoreState()?.studentList,
      isLoading: getStoreState()?.isLoading,
      nationality: selectedStudent?.ID ? getStoreState()?.nationality : "",
    }));
  }
  // show and hide add modal
  function toggleNewModal(e, student = null) {
    setState({
      ...state,
      isAdd: !isAdd,
      selectedStudent: student?.ID ? student : null,
      nationality: student?.ID ? nationality : "",
    });
  }
  // handle role change
  function handleRoleChange(roleId) {
    setState({ ...state, activeRoleId: roleId });
  }
  let isEditDisabled = false;
  if (activeRoleId === 0 && selectedStudent?.ID) {
    isEditDisabled = true;
  }
  return (
    <Container>
      <SelectWrapper>
        <MuiDropdown
          handleRoleChange={handleRoleChange}
          options={["Admin Role", "Registrar Role"]}
        />
      </SelectWrapper>
      <ButtonWrapper>
        <Button variant="contained" onClick={toggleNewModal}>
          Add New Student
        </Button>
      </ButtonWrapper>
      <MuiTable
        columns={tableColumns}
        data={studentList}
        isLoading={isLoading}
        onRowClicked={toggleNewModal}
      />
      {isAdd && (
        <StudentForm
          toggleModal={toggleNewModal}
          isOpen={isAdd}
          selectedStudent={selectedStudent}
          nationalities={nationalities}
          currentStudentNat={nationality}
          isEditDisabled={isEditDisabled}
        />
      )}
    </Container>
  );
}
// Method to retrieve state from Stores
const getStoreState = () => ({
  studentList: studentStore.getStore()?.studentList,
  isLoading: studentStore.getStore()?.isLoading,
  nationality: NationalityStore.getStore()?.studentNationality,
});
export default App;
