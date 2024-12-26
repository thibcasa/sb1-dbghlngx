import { tables } from '../client';
import type { AirtableRecord, AirtableError } from '../types';

export const airtableService = {
  async findRecords(tableName: keyof typeof tables, filterFormula?: string): Promise<AirtableRecord[]> {
    try {
      const records = await tables[tableName].select({
        filterByFormula: filterFormula
      }).all();
      
      return records;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async createRecord(tableName: keyof typeof tables, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      const record = await tables[tableName].create(fields);
      return record;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updateRecord(tableName: keyof typeof tables, id: string, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      const record = await tables[tableName].update(id, fields);
      return record;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async deleteRecord(tableName: keyof typeof tables, id: string): Promise<void> {
    try {
      await tables[tableName].destroy(id);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  private handleError(error: any): AirtableError {
    const airtableError = new Error(error.message) as AirtableError;
    airtableError.statusCode = error.statusCode;
    airtableError.type = error.type;
    return airtableError;
  }
};