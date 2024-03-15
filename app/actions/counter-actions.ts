import { prisma } from "../db";

class CounterActions {
    counterId = 1;

    async getCounter() {
        const count = await prisma.count.findUnique({
            where: { id: this.counterId }
        });
        return count?.value;
    }

    async incrementCounter() {
        const count = await this.getCounter();
        await prisma.count.update({
            where: { id: this.counterId },
            data: {
                value: count! + 1,
            },
        });
    }
}

export default new CounterActions();