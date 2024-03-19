import countActions from "@/app/actions/count-actions1";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const count = await countActions.getCount();
    return Response.json({ count });
}