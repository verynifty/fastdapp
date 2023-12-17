import { init, useQuery } from "@airstack/airstack-react";

init(process.env.NEXT_PUBLIC_AIR_STACK_API_KEY);

const AirStack = (props) => {
    const { data, loading, error } = useQuery(props.query, props.variables);

    if (loading || !data) {
        return (<span class="loading loading-spinner loading-md"></span>)
    }

    if (error) {
        console.error(error);
        return (<p>Error: {error.message}</p>);
    }

    console.log("Airstack data", data, loading, error)
    if (typeof props.render === 'function') {
        try {
            let computed = props.render(data);
            return (<div>{computed}</div>);
        } catch (error) {
            console.error("Error in render function", error);
        }

    }

    if (props.render != null) {
        console.log("Airstack call", data)
        return (<div>{props.render(data)}</div>);
    }

    return <div>{JSON.stringify(data)}</div>
};

export default AirStack;