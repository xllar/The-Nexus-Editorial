// src/utils/sanityClient.ts

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '1rk9myhw', 
  dataset: 'production', 
  apiVersion: '2024-08-01',
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
