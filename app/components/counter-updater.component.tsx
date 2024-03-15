import { revalidatePath } from "next/cache";
import counterActions from "../actions/counter-actions";
import CounterButton from "./counter-button.component";

async function CounterUpdater() {

    const incrementCounter = async () => {
        "use server";
        await counterActions.incrementCounter();
        revalidatePath("/products");
    };

    return (
        <form action={ incrementCounter }>
            <CounterButton />
        </form>
    );
}

export default CounterUpdater;