import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateLink = (page) => {
    navigate(page);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="myLogo">
        <img src="/images/mylogo.png" alt="" />
      </div>
      <List>
        {[
          {
            text: "Products",
            icon: <MdDashboard />,
            page: "/dashboard/products",
          },
          { text: "Create", icon: <IoCreate />, page: "/create/product" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigateLink(item.page)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Sidebar</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
