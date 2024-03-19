import * as countActions from "@/app/actions/count-actions";

export const dynamic = 'force-dynamic';

export async function GET() {
    const count = await countActions.getCount();
    return Response.json({ count });
}
