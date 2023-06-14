import React from "react";
import { Pagination as AlgoliaPagination } from "react-instantsearch-hooks-web";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(AlgoliaPagination)(({ theme }) => ({
  "& .ais-Pagination-list": {
    marginTop: "1rem",
    display: "flex",
  },
  "& .ais-Pagination-item": {
    position: "relative",
    zIndex: 1,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      cursor: "pointer",
      "& .ais-Pagination-link": {
        color: theme.palette.common.white,
      },
    },
  },
  "& .ais-Pagination-link": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "0.75rem",
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "relative",
    left: 0,
  },
  "& .ais-Pagination-item--selected.ais-Pagination-item": {
    "&:after": {
      backgroundColor: theme.palette.primary.light,
      opacity: 1,
      visibility: "visible",
    },
    "& .ais-Pagination-link": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  "& .ais-Pagination-item--disabled.ais-Pagination-item": {
    color: theme.palette.grey,
    cursor: "default",
    "& .ais-Pagination-link": {
      color: theme.palette.grey,
    },
  },
}));

export default function Pagination() {
  return <StyledPagination />;
}
