import Fastify from 'fastify';
import cors from '@fastify/cors';
import knex from 'knex';
import knexConfig from './knexfile.js';

const fastify = Fastify({ logger: true });
const db = knex(knexConfig.development);

// Register CORS
await fastify.register(cors, {
  origin: true
});

// Get all emails or search emails
fastify.get('/api/emails', async (request, reply) => {
  const { query } = request.query;
  
  try {
    let emailsQuery = db('emails').orderBy('created_at', 'desc');
    
    if (query) {
      const searchQuery = `%${query}%`;
      emailsQuery = emailsQuery.where(builder => {
        builder.where('subject', 'like', searchQuery)
          .orWhere('body', 'like', searchQuery)
          .orWhere('to', 'like', searchQuery)
          .orWhere('cc', 'like', searchQuery)
          .orWhere('bcc', 'like', searchQuery);
      });
    }
    
    const emails = await emailsQuery;
    return emails.map(email => ({
      ...email,
      to: JSON.parse(email.to),
      cc: JSON.parse(email.cc || '[]'),
      bcc: JSON.parse(email.bcc || '[]')
    }));
  } catch (error) {
    console.error('Error fetching emails:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});

// Create new email
fastify.post('/api/emails', async (request, reply) => {
  const { to, cc, bcc, subject, body } = request.body;
  
  try {
    if (!Array.isArray(to) || !to.length || !subject || !body) {
      return reply.status(400).send({ error: 'Invalid email data' });
    }
    
    const [email] = await db('emails').insert({
      to: JSON.stringify(to),
      cc: JSON.stringify(cc || []),
      bcc: JSON.stringify(bcc || []),
      subject,
      body
    }).returning('*');
    
    return {
      ...email,
      to: JSON.parse(email.to),
      cc: JSON.parse(email.cc),
      bcc: JSON.parse(email.bcc)
    };
  } catch (error) {
    console.error('Error creating email:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});

try {
  await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
  console.log(`Server listening on port ${process.env.PORT || 3001}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
