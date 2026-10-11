import { buildLlms, textResponse } from "../llms/build";

// Regenerated at most hourly from the live admin feed.
export const revalidate = 3600;

export async function GET() {
  return textResponse(await buildLlms({ full: false }));
}
