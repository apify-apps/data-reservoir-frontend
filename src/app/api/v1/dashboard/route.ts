import { DB } from "@/database/client";
import { sql } from "drizzle-orm";

export async function GET() {
  return Response.json(
    await DB.execute<{
      category: string,
      owner: string,
      tableName: string,
      rowCount: string
    }>(sql`
      SELECT
          m.name AS "category",
          m.owner,
          tc.name AS "tableName",
          tc.row_count AS "rowCount"
      FROM (
          SELECT
              "table_name" AS "name", 
              (xpath('/row/cnt/text()', xml_count))[1]::text::int AS row_count
          FROM (
          SELECT 
              "table_name",
              table_schema, 
              QUERY_TO_XML(FORMAT('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') AS xml_count
          FROM information_schema.tables
          WHERE table_schema = 'public' --<< change here for the schema you want
          ) t
      ) tc
      JOIN master_table_category m
          ON STRPOS(tc.name, m.prefix) > 0
    `)
  );
}