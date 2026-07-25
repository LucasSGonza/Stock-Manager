import React from "react";
import { Box, Icon, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { COLORS, NAV_ITEMS } from "@/util";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navIcons = {
  "/estoque": <Icon fontSize="medium">checkroom</Icon>,
  "/caixa": <Icon fontSize="medium">wallet</Icon>,
} as const;

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          bgcolor: COLORS.primary,
          color: COLORS.contrastText,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <Box
          sx={{
            mx: "auto",
            maxWidth: "72rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: { xs: 2, md: 2.5 },
          }}
        >
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: COLORS.contrastText,
              }}
            >
              Atelier
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                opacity: 0.8,
                color: COLORS.contrastText,
                display: { xs: "none", sm: "inline" },
              }}
            >
              · Gestão de Moda
            </Typography>
          </Link>

          {/* Desktop nav */}
          <Box
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}
          >
            {NAV_ITEMS.map((item) => {
              const IconNav = navIcons[item.to];
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      color: COLORS.contrastText,
                      bgcolor: active ? `${COLORS.contrastText}26` : "transparent",
                      transition: "background-color 0.15s",
                      "&:hover": {
                        bgcolor: `${COLORS.contrastText}1a`,
                      },
                    }}
                  >
                    {IconNav}
                    {item.label}
                  </Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flex: 1, pb: { xs: 12, md: 5 } }}>
        <Box sx={{ mx: "auto", maxWidth: "72rem", px: 2, py: { xs: 3, md: 5 } }}>
          {children}
        </Box>
      </Box>

      {/* Mobile bottom nav */}
      <Box
        component="nav"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          bgcolor: "background.paper",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {NAV_ITEMS.map((item) => {
            const IconNav = navIcons[item.to];
            const active = pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    py: 1.5,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    color: active ? COLORS.primary : COLORS.muted,
                    transition: "color 0.15s",
                  }}
                >
                  {IconNav}
                  {item.label}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
