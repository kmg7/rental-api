import { Injectable } from '@nestjs/common';
import { Pool, PoolClient, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';
import { DbResponse } from './response/response.model';

@Injectable()
export class PgresService {
  private pool: Pool;
  constructor(config: ConfigService) {
    this.pool = new Pool({
      connectionString: config.get('DB_URL'),
    });
  }
  async query(query: string, params?: Array<string>): Promise<DbResponse> {
    let client: PoolClient;
    let response: DbResponse;
    try {
      client = await this.pool.connect();
      const result: QueryResult = await client.query(query, params);
      response = {
        success: true,
        data: result.rows,
        meta: {
          count: result.rowCount,
        },
      };
    } catch (error) {
      response = {
        success: false,
        error: [error],
      };
    } finally {
      if (client) {
        client.release();
      }
      return response;
    }
  }
}
