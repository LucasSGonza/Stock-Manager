import { Box, Typography } from "@mui/material";

interface ContentAreaProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ContentArea({
  title,
  description,
  children,
}: ContentAreaProps) {
  return (
    <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 400 }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5, mb: 3 }}
      >
        {description}
      </Typography>
      {children}
    </Box>
  );
}
