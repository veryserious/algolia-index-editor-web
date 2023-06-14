import React from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Built with "}
          <Link color="inherit" href="https://nextjs.org/">
            Next.js
          </Link>
          {" and "}
          <Link color="inherit" href="https://mui.com/">
            Material-UI
          </Link>
          {" by "}
          <Link color="inherit" href="https://github.com/veryserious">
            very serious
          </Link>
          {"."}
        </Typography>
      </Box>
    </footer>
  );
}
