import { revalidatePath } from "next/cache";
import countActions from "@/app/actions/count-actions";
import CountButton from "@/app/components/count-button.component";

async function CountUpdater() {

    const incrementCount = async () => {
        "use server";
        await countActions.incrementCount();
        revalidatePath("/count");
    };

    return (
        <form action={ incrementCount }>
            <CountButton />
        </form>
    );
}

export default CountUpdater;