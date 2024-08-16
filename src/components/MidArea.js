import React from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { Button, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { purple } from "@mui/material/colors";

// Customized Button for Running Lists
const RunButton = (props) => (
  <Button
    {...props}
    sx={{
      color: (theme) => theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      fontSize: "13px",
      "&:hover": {
        backgroundColor: purple[700],
      },
    }}
  />
);

// Mid Area Component
function MidArea({ area_list, add_list, event_values }) {
  // Event firing function
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;
    let repeat = 1;
    let str1 = `comp${arr[i]}-${id}-${i}`;

    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();
      while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
        curr_time = new Date().getTime();
      }
    } else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = event_values.repeat[str1] + 1;
    }
    i++;

    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();
        while ((curr_time - last_time) / 1000 < event_values.wait[str2] - 2) {
          curr_time = new Date().getTime();
        }
        i++;
      } else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (event_values.repeat[str2] + 1);
        i++;
      } else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  return (
    <Box className="flex-1 h-screen overflow-auto thin-scrollbar p-3">
      <Box className="flex justify-between">
        <Box className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Mid Area
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 0 }}
            startIcon={<AddIcon />}
            onClick={() => add_list()}
          >
            Add List{" "}
          </Button>
        </Box>
      </Box>
      <Box className="grid grid-flow-col">
        {area_list.midAreaLists.map((l) => (
          <Box className="w-60" key={l.id}>
            <Paper elevation={3} className="p-4">
              <Box className="w-52 border border-2 border-gray-300 p-2">
                <Droppable droppableId={l.id} type="COMPONENTS">
                  {(provided) => (
                    <Box
                      component="ul"
                      className={`${l.id} w-48 h-full`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Box className="text-center mx-auto my-2 mb-4">
                        <RunButton
                          variant="contained"
                          startIcon={<PlayArrowIcon />}
                          onClick={() => handleClick(l.comps, l.id)}
                        >
                          Run{" "}
                        </RunButton>
                      </Box>

                      {l.comps &&
                        l.comps.map((x, i) => {
                          let str = `${x}`;
                          let component_id = `comp${str}-${l.id}-${i}`;

                          return (
                            <Draggable
                              key={`${str}-${l.id}-${i}`}
                              draggableId={`${str}-${l.id}-${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <Box
                                  component="li"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getComponent(str, component_id)}
                                  {provided.placeholder}
                                </Box>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Mapping state to props
const mapStateToProps = (state) => ({
  area_list: state.list,
  event_values: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  add_list: () => dispatch(addList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
