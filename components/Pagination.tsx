import React from "react";
import { Pagination as AlgoliaPagination } from "react-instantsearch-hooks-web";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(AlgoliaPagination)({
  "& .ais-Pagination-list": {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    paddingLeft: 0,
  },
  "& .ais-Pagination-item": {
    textDecoration: "none",
    position: "relative",
    zIndex: 1,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      //backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      "& .ais-Pagination-link": {
        //color: theme.palette.common.white,
      },
      "&:after": {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  "& .ais-Pagination-link": {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "0.75rem",
    width: "100%",
    height: "100%",
    marginX: "8px",
    zIndex: 1,
    position: "relative",
    left: 0,
  },
  "& .ais-Pagination-item--selected.ais-Pagination-item": {
    "&:after": {
      //backgroundColor: theme.palette.primary.light,
      opacity: 1,
      visibility: "visible",
    },
    "& .ais-Pagination-link": {
      //color: theme.palette.primary.main,
    },
    "&:hover": {
      //color: theme.palette.primary.main,
      "&:after": {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  "& .ais-Pagination-item--disabled.ais-Pagination-item": {
    //color: theme.palette.grey,
    cursor: "default",
    "&:after": {
      content: "unset",
    },
    "& .ais-Pagination-link": {
      //color: theme.palette.grey,
    },
  },
});

export default function Pagination() {
  return <StyledPagination />;
}
