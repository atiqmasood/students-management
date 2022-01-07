import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyleList = styled(List)(() => ({
  paddingTop: "0px",
  paddingBottom: "0px",

  marginBottom: "15px",
}));
const StyleListItem = styled(ListItem)(() => ({
  marginBottom: "15px",
  background: "#E7EBF0",
}));

export default function MuiList({
  members,
  toggleForm,
  deleteMember,
  isEditDisabled,
}) {
  return (
    <StyleList dense={false}>
      {members?.length > 0 &&
        members.map((item, index) => (
          <StyleListItem
            key={index}
            secondaryAction={
              <React.Fragment>
                <Tooltip title="Edit">
                  <span>
                    <IconButton
                      disabled={isEditDisabled}
                      edge="end"
                      color="primary"
                      onClick={(e) => toggleForm(e, item, index)}
                    >
                      <EditIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Delete">
                  <span>
                    <IconButton
                      disabled={isEditDisabled}
                      edge="end"
                      color="error"
                      onClick={(e) => deleteMember(e, item, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </React.Fragment>
            }
          >
            <ListItemText
              primary={`${item?.firstName ?? ""} ${item?.lastName ?? ""}`}
            />
            <ListItemText primary={item?.relationship} />
            <ListItemText primary={item?.nationality?.Title} />
          </StyleListItem>
        ))}
    </StyleList>
  );
}
