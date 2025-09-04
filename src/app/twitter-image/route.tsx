// Consolidated with opengraph-image - both use identical content
import { GET as OG_GET } from "../opengraph-image/route";

// Next.js expects `runtime` to be defined in this file (not re-exported)
export const runtime = "edge";
export const GET = OG_GET;
