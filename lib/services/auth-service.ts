import { getSession } from '@auth0/nextjs-auth0';
import { type ActionResult } from '@/lib/actions/action-result';

export const isAuthentified = async (): Promise<ActionResult<void>> => {
    const session = await getSession();
    if (session === null || session === undefined) {
        return { message: 'User not authenticated', error: true };
    }
    return { message: 'User authenticated', error: false };
};