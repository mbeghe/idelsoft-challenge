import { Box, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const EmailListContainer = styled(Box)(({ theme }) => ({
  width: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`
}));

export default function EmailList({ emails, selectedEmail, onEmailSelect, onSearch }) {
  return (
    <EmailListContainer>
      <SearchContainer>
        <TextField
          fullWidth
          placeholder="Search emails..."
          size="small"
          onChange={(e) => onSearch(e.target.value)}
          sx={{ bgcolor: 'background.paper' }}
        />
      </SearchContainer>
      <List>
        {emails.map((email) => (
          <StyledListItemButton
            key={email.id}
            selected={selectedEmail?.id === email.id}
            onClick={() => onEmailSelect(email)}
          >
            <ListItemText
              primary={email.subject}
              secondary={email.body.substring(0, 100)}
              secondaryTypographyProps={{ noWrap: true }}
            />
          </StyledListItemButton>
        ))}
      </List>
    </EmailListContainer>
  );
}