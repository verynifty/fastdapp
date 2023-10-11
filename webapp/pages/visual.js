import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";

import { ButtonGroup, ButtonGroupProps } from "components/visualblocks/ButtonGroup";
import { Card, CardProps } from "components/visualblocks/Card";
import { Columns, ColumnsProps } from "components/visualblocks/Columns";
import { Hero, HeroProps } from "components/visualblocks/Hero";
import { Heading, HeadingProps } from "components/visualblocks/Heading";
import { Flex, FlexProps } from "components/visualblocks/Flex";
import { Logos, LogosProps } from "components/visualblocks/Logos";
import { Stats, StatsProps } from "components/visualblocks/Stats";
import { Text, TextProps } from "components/visualblocks/Text";
import { VerticalSpace, VerticalSpaceProps } from "components/visualblocks/VerticalSpace";

// Create puck component config
const config = {
    components: {
        ButtonGroup,
        Card,
        Columns,
        Hero,
        Heading,
        Flex,
        Logos,
        Stats,
        Text,
        VerticalSpace,
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
