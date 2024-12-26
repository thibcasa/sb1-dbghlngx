export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

export interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tables: {
    leads: string;
    contacts: string;
    campaigns: string;
    interactions: string;
  };
}

export interface AirtableError extends Error {
  statusCode?: number;
  type?: string;
}