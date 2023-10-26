import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        height: "100vh", // Define a altura como 100% da viewport
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
