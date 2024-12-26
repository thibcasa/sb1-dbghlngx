import Airtable from 'airtable';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

export const airtable = new Airtable({ apiKey: AIRTABLE_API_KEY })
  .base(AIRTABLE_BASE_ID);

export const tables = {
  leads: airtable('Leads'),
  contacts: airtable('Contacts'),
  campaigns: airtable('Campaigns'),
  interactions: airtable('Interactions')
};