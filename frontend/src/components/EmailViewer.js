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
  marginBottom: theme.spacing(2)
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
        <Typography variant="h5" gutterBottom sx={{ wordBreak: 'break-word' }}>
          {email.subject}
        </Typography>
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
        <EmailContent>{email.body}</EmailContent>
      </EmailPaper>
    </ViewerContainer>
  );
}