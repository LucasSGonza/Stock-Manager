import { COLORS, SHADOWS } from "@/util";
import { Box, Typography, List, ListItem, Button, Icon } from "@mui/material";
import { ConfigImportExcel } from "./components";
import { useState } from "react";

type MenuNames = "Perfil" | "Importação";

type ConfigSideMenuItemProps = {
  selected: boolean; // Indicates if the menu item is currently selected
  disabled?: boolean;
  icon: string;
  label: MenuNames;
};

const configSideMenuItems: ConfigSideMenuItemProps[] = [
  {
    icon: "account_circle",
    label: "Perfil",
    disabled: true,
    selected: false,
  },
  {
    icon: "upload",
    label: "Importação",
    disabled: false,
    selected: true,
  },
];

export function ConfigurationPage() {
  const [items, setItems] =
    useState<ConfigSideMenuItemProps[]>(configSideMenuItems);
  const [selectedItem, setSelectedItem] = useState<MenuNames>("Importação");

  const handleItemClick = (label: MenuNames) => {
    // Update the selected state of the items based on the clicked label
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: item.label === label,
      })),
    );

    // Update the selected item
    setSelectedItem(label);
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 2,
          border: `1px solid ${COLORS.border}`,
          bgcolor: "background.paper",
          boxShadow: SHADOWS.card,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        {/* Sidemenu */}
        <Box
          sx={{
            width: { xs: "100%", md: 240 },
            flexShrink: 0,
            bgcolor: COLORS.background,
            borderRight: { md: `1px solid ${COLORS.border}` },
            borderBottom: { xs: `1px solid ${COLORS.border}`, md: "none" },
            p: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              mb: 1,
            }}
          >
            Configurações
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: { xs: 1, md: 1 },
              padding: 0,
              margin: 0,
            }}
          >
            {items.map((item, index) => (
              <ListItem sx={{ padding: 0, maxWidth: "207px" }} key={index}>
                <Button
                  startIcon={<Icon fontSize="small">{item.icon}</Icon>}
                  onClick={() => handleItemClick(item.label)}
                  sx={{
                    ...(item.selected && {
                      bgcolor: COLORS.primary,
                      color: COLORS.contrastText,
                    }),
                    justifyContent: "flex-start",
                    padding: "6px 0 6px 16px",
                  }}
                  fullWidth
                  disabled={item.disabled}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Content */}
        <ConfigImportExcel visible={selectedItem === "Importação"} />
      </Box>
    </Box>
  );
}
