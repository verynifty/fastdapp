import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";


// Create puck component config
const config = {
    components: {
        HeadingBlock: {
            fields: {
                children: {
                    type: "text",
                },
            },
            render: ({ children }) => {
                return <h1>{children}</h1>;
            },
        },
    },
};

// Describe the initial data
const initialData = {
    content: [],
    root: {},
};

// Save the data to your database
const save = (data) => { };


export default function Visual() {
    return (
        <>
            <Puck config={config} data={initialData} onPublish={save} />
        </>
    )
}
