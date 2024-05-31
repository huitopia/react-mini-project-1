import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
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
