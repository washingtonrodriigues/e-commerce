import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as React from "react";

const Loading = ({ className }: any) => {
  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
