import counterActions from "../actions/counter-actions";

async function CounterViewer() {
    const value = await counterActions.getCounter();

    return (
        <p>You clicked {value} times</p>       
    );
}

export default CounterViewer;