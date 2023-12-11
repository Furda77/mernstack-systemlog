import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
    DownloadOutlined,
    ReceiptLong,
    SupervisorAccount,
    Autorenew,
    Computer
} from "@mui/icons-material";
import {
    Box,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox";
import OverviewChart from 'components/OverviewChart';
import { useGetDashboardDataQuery, useGetOverviewDataQuery } from "state/api"



const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { data: overviewData, isLoading: isOverviewLoading } = useGetOverviewDataQuery();
    const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardDataQuery();



    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "system_id",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "cpu_usage_percent",
            headerName: "Use of CPU in %",
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
            <FlexBetween>
                <Header title="Hlavní panel" subtitle="Vítej v přehledu pro celou datábázi" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Stáhnout záznamy
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title="Záznamy"
                    value={dashboardData?.totalLogs || "N/A"}
                    description="Záznamů celkem v databázi"
                    icon={
                        <ReceiptLong
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Zařízení"
                    value={dashboardData?.distinctSystemCount || "N/A"}
                    description="Počet zařízení v databázi"
                    icon={
                        <Computer
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart data={overviewData} isLoading={isOverviewLoading} isDashboard={true} />
                </Box>
                <StatBox
                    title="Správci systému"
                    value={dashboardData?.totalUsers || "N/A"}
                    description="Celkový počet adminů"
                    icon={
                        <SupervisorAccount
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Nejnovější záznam"
                    value={dashboardData?.newestLogCreatedAt}
                    description="Poslední záznam v databázi"
                    icon={
                        <Autorenew
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />

                    }
                />

                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "5rem",
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
                            backgroundColor: theme.palette.background.alt,
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
                    <DataGrid
                        loading={isDashboardLoading || !dashboardData}
                        getRowId={(row) => row._id}
                        rows={(dashboardData && dashboardData.systemdata) || []}
                        columns={columns}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;