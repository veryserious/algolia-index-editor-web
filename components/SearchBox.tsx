import React from "react";
import { SearchBox as AlgoliaSearchBox } from "react-instantsearch-hooks-web";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledSearchBox = styled(AlgoliaSearchBox)((props) => ({
  marginBottom: "3rem",
  "& .ais-SearchBox-form": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  "& .ais-SearchBox-input": {
    width: "100%",
    padding: "0.5rem",
    border: "none",
    borderBottom: "1px solid #ccc",
    fontSize: "1rem",
    "&:focus": {
      outline: "none",
      borderBottom: "1px solid #333",
    },
  },
  "& .ais-SearchBox-submit": {
    display: "none",
  },
  "& .ais-SearchBox-reset, .ais-SearchBox-loadingIndicator": {
    marginLeft: "1rem",
  },
}));

export default function SearchBox() {
  return (
    <>
      <Typography
        marginBottom={1}
        color="primary"
        textAlign={"center"}
        variant="h4"
        component="h1"
        fontWeight={700}
      >
        SEARCH
      </Typography>
      <StyledSearchBox />
    </>
  );
}
