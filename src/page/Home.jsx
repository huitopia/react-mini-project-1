import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box mb={300}>
      <Navbar />
      <Box
        mx={{
          base: 0,
          lg: 150,
        }}
        mt={10}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
