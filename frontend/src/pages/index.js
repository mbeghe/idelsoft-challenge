import { useState, useCallback, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { debounce } from 'lodash';
import EmailList from '../components/EmailList';
import EmailViewer from '../components/EmailViewer';
import ComposeEmail from '../components/ComposeEmail';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });

  const fetchEmails = useCallback(async (query = '') => {
    try {
      const url = query
        ? `http://localhost:3001/api/emails?query=${encodeURIComponent(query)}`
        : 'http://localhost:3001/api/emails';
      const response = await fetch(url);
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleSearch = useCallback(
    debounce((query) => {
      fetchEmails(query);
    }, 500),
    [fetchEmails]
  );

  const handleSendEmail = async () => {
    try {
      const emailData = {
        to: composeData.to.split(',').map(email => email.trim()),
        cc: composeData.cc ? composeData.cc.split(',').map(email => email.trim()) : [],
        bcc: composeData.bcc ? composeData.bcc.split(',').map(email => email.trim()) : [],
        subject: composeData.subject,
        body: composeData.body
      };

      const response = await fetch('http://localhost:3001/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setIsComposeOpen(false);
        setComposeData({ to: '', cc: '', bcc: '', subject: '', body: '' });
        fetchEmails();
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex' }}>
      <EmailList
        emails={emails}
        selectedEmail={selectedEmail}
        onEmailSelect={setSelectedEmail}
        onSearch={handleSearch}
      />
      <EmailViewer email={selectedEmail} />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsComposeOpen(true)}
      >
        Compose
      </Button>
      <ComposeEmail
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        composeData={composeData}
        setComposeData={setComposeData}
        onSend={handleSendEmail}
      />
    </Container>
  );
}
