import React from "react";
import { Helmet } from "react-helmet";
import SnackbarAction from "../SnackbarAction";
import { SnackbarProvider } from "notistack";

export default function HelmetElement({ name, element }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pair Legends | {name}</title>
      </Helmet>
      <SnackbarProvider maxSnack={3} action={(key) => SnackbarAction(key)}>
        {element}
      </SnackbarProvider>
    </>
  );
}
