import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSystemDataQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const SystemLogs = () => {
    const theme = useTheme();

    // Hondoty zaslané do back-endu
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetSystemDataQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,

    });

    console.log("data", data)

    //Struktura tabulky
    const columns = [
        {
            field: "_id",
            headerName: "ID záznamu",
            flex: 1,
        },
        {
            field: "system_id",
            headerName: "ID systému",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Vytvořeno",
            flex: 1,
        },
        {
            field: "cpu_usage_percent",
            headerName: "Vytížení CPU v %",
            flex: 0.5,

        },
        {
            field: "uptime",
            headerName: "Uptime",
            flex: 1,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Systémové záznamy" subtitle="Výpis všech záznamu z databáze" />
            <Box //Využití MUI pro styling a design elementu
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid //Komponent který je vidět na stránce. 
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.systemData) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};

export default SystemLogs;