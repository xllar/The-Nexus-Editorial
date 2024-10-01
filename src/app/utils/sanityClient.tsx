// src/utils/sanityClient.ts

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '1rk9myhw', 
  dataset: 'production', 
  apiVersion: '2024-08-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default client;
