import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiSelect from "../MuiSelect";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  updateFamilyMember,
  addStudentFamily,
} from "../../actions/FamilyInfoActions";
import { updateFamilyNationality } from "../../actions/NationalityActions";

const Wrapper = styled.div`
  border: 1px solid #9e9e9e61;
  display: flex;
`;

const ActionButton = styled.div`
  display: block;
  margin-top: 12px;
`;

export default function AddFamilyForm({
  nationalities,
  onChange,
  formValues,
  onAddEditMember,
  closeMember,
  selectedStudent,
}) {
  const { firstName, lastName, nationality, relationship, ID } =
    formValues ?? "";

  function updateMember(e) {
    if (ID) {
      updateFamilyMember({ firstName, lastName, relationship }, ID);
      updateFamilyNationality(ID, nationality?.ID);
      onAddEditMember(e, formValues);
      return;
    }
    if (selectedStudent?.ID) {
      addStudentFamily(
        selectedStudent?.ID,
        { firstName, lastName, relationship },
        (fId) => {
          nationality?.ID && updateFamilyNationality(fId, nationality?.ID);
          onAddEditMember(e, { firstName, lastName, relationship, ID: fId });
        }
      );

      return;
    }
    onAddEditMember(e, formValues);
  }

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "19ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={firstName ?? ""}
          name={"firstName"}
          onChange={onChange}
          label="First Name"
          variant="outlined"
          size="small"
        />
        <TextField
          value={lastName ?? ""}
          name={"lastName"}
          onChange={onChange}
          label="Last Name"
          variant="outlined"
          size="small"
        />
        <MuiSelect
          label={"Relationship"}
          size="small"
          name={"relationship"}
          onChange={onChange}
          value={relationship}
          options={[
            { ID: "Parent", Title: "Parent" },
            { ID: "Sibling", Title: "Sibling" },
            { ID: "Spouse", Title: "Spouse" },
          ]}
        />
        <MuiSelect
          label={"Nationality"}
          size="small"
          name={"nationality"}
          onChange={onChange}
          value={nationality?.ID}
          options={nationalities}
        />
      </Box>
      <ActionButton>
        <IconButton size="small" color="primary" onClick={updateMember}>
          <SaveIcon />
        </IconButton>
        <IconButton size="small" color="warning" onClick={closeMember}>
          <CancelIcon />
        </IconButton>
      </ActionButton>
    </Wrapper>
  );
}
