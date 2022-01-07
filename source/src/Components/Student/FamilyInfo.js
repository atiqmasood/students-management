import React, { useEffect, useState } from "react";
import styled from "styled-components";
// MUI
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import AddFamilyForm from "./AddFamilyForm";
import MuiList from "../MuiList";
import { deleteFamilyMember } from "../../actions/FamilyInfoActions";

const FamilyInfoWrapper = styled.div`
  display: flex;
`;

const AddMemberButton = styled(Fab)`
  margin: 10px;
`;

const NoFamilyWrapper = styled.div`
  text-align: center;
  padding: 1rem;
  color: red;
`;

export default function FamilyInfo({
  familyList,
  selectedStudent,
  nationalities,
  onAddEditMember,
  isEditDisabled,
}) {
  const [state, setState] = useState({
    isAddNew: false,
    familyMembers: [],
    formValues: null,
    editIndex: null,
  });
  const { isAddNew, familyMembers, formValues, editIndex } = state;

  useEffect(() => {
    setState({ familyMembers: familyList ?? [] });
  }, [familyList]);

  // toggle new member form
  function toggleMember(e, selectedMember, editIndex = null) {
    setState({
      ...state,
      isAddNew: true,
      formValues: selectedMember ? selectedMember : null,
      editIndex,
    });
  }
  // close form
  function closeMember() {
    setState({
      ...state,
      isAddNew: false,
      formValues: null,
    });
  }
  // onchange handler
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "nationality") {
      const val = nationalities?.filter((n) => n.ID === value)?.[0];
      setState({ ...state, formValues: { ...formValues, [name]: val } });
      return;
    }
    setState({ ...state, formValues: { ...formValues, [name]: value } });
  }

  function onSubmit(e, values) {
    onAddEditMember(e, values, editIndex);
    setState({ ...state, formValues: null, editIndex: null });
  }

  // delete member
  function deleteMember(e, member, deleteIndex) {
    if (member?.ID) {
      deleteFamilyMember(member?.ID);
    }
    onAddEditMember(e, member, deleteIndex, true);
  }
  // return add button
  function addButton() {
    return (
      <AddMemberButton
        disabled={isEditDisabled}
        size="small"
        color="primary"
        aria-label="add"
        onClick={toggleMember}
      >
        <AddIcon />
      </AddMemberButton>
    );
  }

  return (
    <div>
      <FamilyInfoWrapper>
        <h3>Family Info</h3>
        <Tooltip title="Add Family Member">
          <span>
            <AddMemberButton
              disabled={isEditDisabled}
              size="small"
              color="primary"
              aria-label="add"
              onClick={toggleMember}
            >
              <AddIcon />
            </AddMemberButton>
          </span>
        </Tooltip>
      </FamilyInfoWrapper>
      {familyMembers?.length > 0 ? (
        <MuiList
          members={familyMembers}
          toggleForm={toggleMember}
          deleteMember={deleteMember}
          isEditDisabled={isEditDisabled}
        />
      ) : (
        <NoFamilyWrapper>No family member</NoFamilyWrapper>
      )}
      {isAddNew && (
        <AddFamilyForm
          onChange={handleChange}
          closeMember={closeMember}
          nationalities={nationalities}
          formValues={formValues}
          onAddEditMember={onSubmit}
          selectedStudent={selectedStudent}
          isEditDisabled={isEditDisabled}
        />
      )}
    </div>
  );
}
