import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../components/contexts/UserContext";
import { getMatchesById } from "../utils/api";
import { useSnackbar } from "notistack";
import Duration from "duration";
import { makeScore } from "../utils/index";

const columns = [
    { field: "id", headerName: "Begin At", width: 180 },
    { field: "endAt", headerName: "End At", width: 180 },
    {
        field: "score",
        headerName: "Score",
        type: 'number',
        valueGetter: (params) => {
            const timeLeft = 300 - (new Date(params.row.endAt) - new Date(params.row.id)) / 1000
            return makeScore(params.row.tilesDone, params.row.tiles, params.row.champs, timeLeft) || -1
        },
    },
    {
        field: "duration",
        headerName: "Duration",
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
                const dataRows = [...data.resultObject].filter(match => new Date(match.endAt) > new Date(match.beginAt)).map((match) => {
                    const { id, beginAt, endAt, ...props } = match;
                    return {
                        id: `${new Date(beginAt).toLocaleString()}`,
                        endAt: `${new Date(endAt).toLocaleString()}`,
                        ...props,
                    };
                })
                setLoading(false);
                setRows(dataRows);
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
    /*rowsPerPageOptions={[10]}*/
    return (
        <Box style={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                loading={loading}
                disableSelectionOnClick
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
            />
        </Box>
    );
}
