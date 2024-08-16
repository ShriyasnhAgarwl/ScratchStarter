import React, { useState } from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { addCharacter, setActive } from "../redux/character/actions";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";

// Styled FormControl for MUI v5
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

// Styled Button for MUI v5
const StyledButton = styled(Button)(({ theme }) => ({
  margin: 0,
}));

function PreviewArea({ character, add_character, set_active }) {
  const [active, setActive] = useState(character.active);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const handleChange = (e) => {
    setActive(e.target.value);
    set_active(e.target.value);
  };

  return (
    <Box
      className="w-full flex-none h-full overflow-y-auto thin-scrollbar p-3"
      id="preview_area"
    >
      <Box className="flex justify-between mb-10">
        <Box className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Preview Area
        </Box>
        <Box>
          <StyledFormControl>
            <InputLabel id="demo-simple-select-placeholder-label-label">
              Active
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={active}
              onChange={handleChange}
              displayEmpty
            >
              {character.characters.map((x, i) => {
                const first = x.id.charAt(0).toUpperCase();
                const name = first + x.id.substr(1);

                return (
                  <MenuItem key={i} value={x.id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </StyledFormControl>
        </Box>
        <Box>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<AddCircleIcon />}
            onClick={add_character}
          >
            Create
          </StyledButton>
        </Box>
      </Box>
      <Box className="flex justify-around h-full">
        {character.characters.map((x, i) => (
          <Box
            id={`${x.id}-${i}`}
            key={i}
            className="absolute"
            onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
          >
            <Box id={`${x.id}-div`} className="character">
              <Box
                id={x.id + "-message-box"}
                className="hidden border-2 px-3 py-6 ml-3 bg-yellow-200 rounded-full mb-2 w-auto whitespace-nowrap"
              />
              <Box
                id={x.id + "-message-box1"}
                className="hidden rounded-full border-2 w-4 left-1/2 h-4 px-3 py-6 ml-3 bg-yellow-200 mb-2 whitespace-nowrap"
              />
              <CatSprite charac_id={x.id} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// mapping state to props
const mapStateToProps = (state) => ({
  character: state.character,
});

// mapping functions to components
const mapDispatchToProps = (dispatch) => ({
  add_character: () => dispatch(addCharacter()),
  set_active: (ch_id) => dispatch(setActive(ch_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
