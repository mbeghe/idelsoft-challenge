import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ViewerContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[100],
  overflow: 'auto'
}));

const EmailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const EmailHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'relative'
}));

const TimestampText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  color: theme.palette.text.secondary
}));

const EmailDivider = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(2, 0)
}));

const EmailContent = styled(Typography)({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
});

const RecipientText = styled(Typography)({
  '& .recipient-list': {
    wordBreak: 'break-all'
  }
});

export default function EmailViewer({ email }) {
  if (!email) {
    return (
      <ViewerContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="text.secondary">Select an email to view</Typography>
      </ViewerContainer>
    );
  }

  return (
    <ViewerContainer>
      <EmailPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ wordBreak: 'break-word', flex: 1 }}>
            {email.subject}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
            {new Date(email.created_at).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(email.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          </Typography>
        </Box>
        <EmailHeader>
          <RecipientText variant="subtitle2" color="text.secondary">
            To: <Box component="span" className="recipient-list">{email.to.join(', ')}</Box>
          </RecipientText>
          {email.cc.length > 0 && (
            <RecipientText variant="subtitle2" color="text.secondary">
              CC: <Box component="span" className="recipient-list">{email.cc.join(', ')}</Box>
            </RecipientText>
          )}
          {email.bcc.length > 0 && (
            <RecipientText variant="subtitle2" color="text.secondary">
              BCC: <Box component="span" className="recipient-list">{email.bcc.join(', ')}</Box>
            </RecipientText>
          )}
        </EmailHeader>
        <EmailDivider />
        <EmailContent>{email.body}</EmailContent>
      </EmailPaper>
    </ViewerContainer>
  );
}