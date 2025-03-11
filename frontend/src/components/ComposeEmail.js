import { Box, Button, Dialog, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(1)
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export default function ComposeEmail({ open, onClose, composeData, setComposeData, onSend }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogHeader>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>
      <DialogContent>
        <FormContainer>
          <TextField
            label="To"
            value={composeData.to}
            onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
            placeholder="email1@example.com, email2@example.com"
            size="small"
          />
          <TextField
            label="CC"
            value={composeData.cc}
            onChange={(e) => setComposeData({ ...composeData, cc: e.target.value })}
            placeholder="email1@example.com, email2@example.com"
            size="small"
          />
          <TextField
            label="BCC"
            value={composeData.bcc}
            onChange={(e) => setComposeData({ ...composeData, bcc: e.target.value })}
            placeholder="email1@example.com, email2@example.com"
            size="small"
          />
          <TextField
            label="Subject"
            value={composeData.subject}
            onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
            size="small"
          />
          <TextField
            label="Message"
            multiline
            rows={12}
            value={composeData.body}
            onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
            sx={{ flex: 1 }}
          />
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={onSend} variant="contained">Send</Button>
      </DialogActions>
    </Dialog>
  );
}