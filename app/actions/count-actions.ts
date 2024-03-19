'use server';

import { prisma } from "@/app/db";

const countId = 1;

export async function getCount() {
    const count = await prisma.count.findUnique({
        where: { id: countId }
    });
    return count!.value;
}

export async function incrementCount() {
    const count = await getCount();
    await prisma.count.update({
        where: { id: countId },
        data: {
            value: count! + 1,
        },
    });
}