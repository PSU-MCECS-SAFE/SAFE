import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SortIcon from "@mui/icons-material/Sort";
import {
  Menu,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useState } from "react";

function MessageControl() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDropDownOption, setSelectedDropDownOption] = useState("");
  const open = Boolean(anchorEl);

  const handleDropDownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDropDownOption((event.target as HTMLInputElement).value);
    console.log(selectedDropDownOption);
  };
  return (
    <AppBar
      position="static"
      sx={{ marginTop: "10px", backgroundColor: "#fff" }}
    >
      <Toolbar variant="dense">
        <IconButton
          id="message-filter-button"
          edge="start"
          color="success"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDropDownClick}
          aria-controls={open ? "message-filter" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SortIcon fontSize="small" />
        </IconButton>

        <Menu
          id="message-filter"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            style: {
              padding: "5px",
            },
            "aria-labelledby": "message-filter-button",
          }}
          onClose={handleCloseDropDown}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <FormControl>
            <FormLabel id="radio-button-group-message-filter"></FormLabel>
            <RadioGroup
              aria-labelledby="radio-button-group-message-filter"
              defaultValue="read"
              name="message-filter-group"
              onChange={handleChange}
            >
              <FormControlLabel
                value="read"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 18, color: "green" },
                    }}
                  />
                }
                label="Read"
              />
              <FormControlLabel
                value="unread"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                        color: "green",
                      },
                    }}
                  />
                }
                label="Unread"
              />
              <FormControlLabel
                value="replied"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 18, color: "green" },
                    }}
                  />
                }
                label="Replied"
              />
            </RadioGroup>
          </FormControl>
        </Menu>

        <Typography variant="h6" color="black" component="div">
          Feedback
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MessageControl;
