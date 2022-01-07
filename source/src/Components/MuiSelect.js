import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MuiSelect({
  options,
  label,
  value,
  onChange,
  size,
  name,
  disabled,
}) {
  return (
    <FormControl fullWidth size={size}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        disabled={disabled}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={value || ""}
        value={value || ""}
        name={name}
        label={label}
        onChange={onChange}
      >
        {options?.length > 0 &&
          options.map((opt) => (
            <MenuItem key={opt?.ID} value={opt?.ID}>
              {opt?.Title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
