import countActions from "@/app/actions/count-actions";

async function CountViewer() {
    const count = await countActions.getCount();

    return (
        <p>You clicked {count} times</p>       
    );
}

export default CountViewer;