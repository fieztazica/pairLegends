import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../components/contexts/UserContext";
import { getMatchesPageById } from "../utils/api";
import { useSnackbar } from "notistack";
import Duration from "duration";
import { makeScore } from "../utils/index";

const columns = [
    { field: "id", headerName: "Begin At", width: 180 },
    { field: "endAt", headerName: "End At", width: 180 },
    //{
    //    field: "tiles",
    //    headerName: "Tiles",
    //    type: 'number',
    //},
    //{
    //    field: "tilesDone",
    //    headerName: "Tiles Done",
    //    type: 'number',
    //},
    {
        field: "champs",
        headerName: "Champions",
        type: 'number',
    },
    {
        field: "doneTiles",
        headerName: "Status",
        valueGetter: (params) => `${params.row.tilesDone}/${params.row.tiles}`,
    },
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
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [rowCount, setRowCount] = React.useState(0);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        setLoading(true);
        getMatchesPageById(user.id, page + 1, pageSize)
            .then((data) => {
                const { resultObject } = data;

                const dataRows = [...resultObject.items].map((match) => {
                    const { id, beginAt, endAt, ...props } = match;
                    return {
                        id: `${new Date(beginAt).toLocaleString()}`,
                        endAt: `${new Date(endAt).toLocaleString()}`,
                        ...props,
                    };
                })
                setLoading(false);
                setRows(dataRows);
                setRowCount(resultObject.totalCount)
            })
            .catch((err) => {
                setLoading(false);
                SnackBar(`${err.message}`, "error")();
                console.error(err.message);
            });
        // eslint-disable-next-line
    }, [page, pageSize]);

    const SnackBar =
        (message, variant, ...props) =>
            () => {
                enqueueSnackbar(message, {
                    variant,
                    ...props,
                });
            };

    return (
        <Box style={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                loading={loading}
                disableSelectionOnClick
                pagination
                paginationMode="server"
                pageSize={10}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                rowCount={rowCount}
                autoHeight
            />
        </Box>
    );
}
