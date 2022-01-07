import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiDatePicker from "../MuiDatePicker";
import MuiSelect from "../MuiSelect";
import NationalityStore from "../../store/NationalityStore";
import { getNationalities } from "../../actions/NationalityActions";

export default function PersonalInfo({
  selectedStudent,
  onChange,
  isEdit,
  currentStudentNat,
  isEditDisabled,
}) {
  const [state, setState] = useState({
    nationalities: [],
    nationality: "",
  });
  const { nationalities, nationality } = state;
  const { firstName, lastName, dateOfBirth } = selectedStudent ?? "";

  useEffect(() => {
    NationalityStore.addChangeListener(mapStore);
    getNationalities();
    return () => NationalityStore.removeChangeListener(mapStore);
  }, []);

  useEffect(() => {
    mapStore();
  }, [selectedStudent]);

  function mapStore() {
    setState((prevState) => ({
      ...prevState,
      nationalities: getStoreState()?.nationalities,
      nationality: isEdit ? getStoreState()?.nationality : currentStudentNat,
    }));
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "29ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        disabled={isEditDisabled}
        value={firstName}
        name={"firstName"}
        onChange={onChange}
        label="First Name"
        variant="outlined"
      />
      <TextField
        disabled={isEditDisabled}
        value={lastName}
        name={"lastName"}
        onChange={onChange}
        label="Last Name"
        variant="outlined"
      />
      <MuiDatePicker
        disabled={isEditDisabled}
        name={"dateOfBirth"}
        value={dateOfBirth}
        onChange={onChange}
        label={"DateOfBirth"}
      />
      <MuiSelect
        disabled={isEditDisabled}
        label={"Nationality"}
        name={"nationality"}
        onChange={onChange}
        value={nationality?.ID}
        options={nationalities}
      />
    </Box>
  );
}
// Method to retrieve state from Stores
const getStoreState = () => ({
  nationalities: NationalityStore.getStore()?.nationalities,
  nationality: NationalityStore.getStore()?.studentNationality,
});
