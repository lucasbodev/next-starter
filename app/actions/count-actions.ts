'use server';

import { prisma } from "@/app/db";
import {revalidateTag} from "next/cache";

const countId = 1;

export async function getCount() {
    const count = await prisma.count.findUnique({
        where: { id: countId },
    });

    if(!count) {
        throw new Error('Count not found');
    }

    return count.value;
}

export async function incrementCount() {
    const count = await getCount() ?? 0;
    await prisma.count.update({
        where: { id: countId },
        data: {
            value: count + 1,
        },
    });
    revalidateTag('count')
}
