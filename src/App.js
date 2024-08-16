import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { styled } from "@mui/system";

// Styled Container
const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  overflow: "hidden",
  paddingTop: theme.spacing(6),
}));

const MainContent = styled("div")(({ theme }) => ({
  flex: 1,
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
  borderTop: "1px solid #e5e7eb",
  borderRight: "1px solid #e5e7eb",
  borderRadius: "0 0.75rem 0.75rem 0",
  marginRight: theme.spacing(2),
}));

const PreviewContainer = styled("div")(({ theme }) => ({
  width: "33%",
  height: "100vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
  borderTop: "1px solid #e5e7eb",
  borderLeft: "1px solid #e5e7eb",
  borderRadius: "0.75rem 0 0 0.75rem",
  marginLeft: theme.spacing(2),
}));

function App({ complist }) {
  // Update Lists of Mid Area
  const onDragEnd = (result) => {
    let element = result.draggableId.split("-")[0];

    const old_list = complist.midAreaLists;
    let source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId,
    );
    if (source_index > -1) {
      let comp_list = old_list[source_index].comps;
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
    }

    let dest_index = old_list.findIndex(
      (x) => x.id === result.destination.droppableId,
    );

    if (dest_index > -1) {
      let dest_comp_list = old_list[dest_index].comps;
      dest_comp_list.splice(result.destination.index, 0, `${element}`);

      old_list[dest_index].comps = dest_comp_list;
    }
  };

  return (
    <div className="bg-blue-100 font-sans">
      <Root>
        <ContentContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <MainContent>
              <Sidebar />
              <MidArea />
            </MainContent>
            <PreviewContainer>
              <PreviewArea />
            </PreviewContainer>
          </DragDropContext>
        </ContentContainer>
      </Root>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    complist: state.list,
  };
};

export default connect(mapStateToProps)(App);
