import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetElement({ name, element }) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Pair Legends | {name}</title>
            </Helmet>
            {element}
        </>
    );
}
