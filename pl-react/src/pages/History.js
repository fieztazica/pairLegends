import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../components/contexts/UserContext";
import { getMatchesById } from "../utils/api";
import { useSnackbar } from "notistack";
import Duration from "duration";

const columns = [
  { field: "id", headerName: "Begin At", width: 200 },
  { field: "endAt", headerName: "End At", width: 200 },
  {
    field: "tiles",
    headerName: "Tiles",
    width: 90,
  },
  {
    field: "tilesDone",
    headerName: "Tiles Done",
    width: 90,
  },
  {
    field: "champs",
    headerName: "Champions",
    width: 90,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 250,
    valueGetter: (params) =>
      new Duration(
        new Date(params.row.id),
        new Date(params.row.endAt)
      ).toString(1, 1),
  },
];

export function History() {
  const { user } = useUser();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    getMatchesById(user.id)
      .then((data) => {
        setLoading(false);
        const dataObject = [...data.resultObject].map((match) => {
          const { id, beginAt, endAt, ...props } = match;
          return {
            id: `${new Date(beginAt).toLocaleString()}`,
            endAt: `${new Date(endAt).toLocaleString()}`,
            ...props,
          };
        });
        setRows(dataObject);
      })
      .catch((err) => {
        setLoading(false);
        SnackBar(`${err.message}`, "error")();
        console.error(err.message);
      });
      // eslint-disable-next-line
  }, []);

  const SnackBar =
    (message, variant, ...props) =>
    () => {
      enqueueSnackbar(message, {
        variant,
        ...props,
      });
    };

  return (
    <Box style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={loading}
        autoHeight
      />
    </Box>
  );
}
