import { prisma } from "@/app/db";

class CountActions {
    countId = 1;

    async getCount() {
        const count = await prisma.count.findUnique({
            where: { id: this.countId }
        });
        return count?.value;
    }

    async incrementCount() {
        const count = await this.getCount();
        await prisma.count.update({
            where: { id: this.countId },
            data: {
                value: count! + 1,
            },
        });
    }
}

export default new CountActions();