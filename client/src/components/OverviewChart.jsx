import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, useMediaQuery } from '@mui/material';

//Logika sestavení grafu a parametry pro filtrování, změnu stránky a seřazení,
const OverviewChart = ({ data, isLoading, isDashboard = false }) => {
    const theme = useTheme(); const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState('10');
    const [sortOrder, setSortOrder] = useState('newest');
    const sessionsPerPage = filter === 'all' ? (data ? data.length : 0) : parseInt(filter, 10);


    useEffect(() => {
        setPage(0); // Obnoví první stránku při zmeně filtru
    }, [filter, sortOrder]);

    if (isLoading || !data) return 'Načítání...';
    if (data.length === 0) return 'Žádné data k dispozici';

    const sortedData = sortOrder === 'newest' ? [...data].reverse() : [...data];
    const totalSessions = sortedData.length;
    const totalPages = Math.ceil(totalSessions / sessionsPerPage);

    const start = page * sessionsPerPage;
    const end = Math.min(start + sessionsPerPage, totalSessions);
    const sampleData = sortedData.slice(start, end).map((item, index) => ({
        session: `Session ${totalSessions - start - index}`,
        cpuUsage: item.cpu_usage_percent,
        numberOfProcesses: item.number_of_processes,
    }));

    const changePage = (offset) => {
        setPage((prevPage) => Math.max(0, Math.min(prevPage + offset, totalPages - 1)));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    return (
        <>

            {!isDashboard && ( // isDashboard fuknce slouží pro určení zobrazení na stránce Hlavní panel a Přehled = aby funkce byla pravdivá, graf se musí nacházet na hlavním panelu.
                <Box display="flex" justifyContent={isMobile ? "center" : "flex-end"} alignItems="center" mb={.5}>
                    <FormControl variant="outlined" size="small" style={{ width: 120, marginRight: isMobile ? 0 : 10 }}>
                        <InputLabel id="session-sort-label">Pořadí od</InputLabel>
                        <Select
                            labelId="session-sort-label"
                            id="session-sort"
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                            label="Sort Order"
                        >
                            <MenuItem value="newest">Nejnovějšího</MenuItem>
                            <MenuItem value="oldest">Nejstaršího</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small" style={{ width: 120, marginLeft: isMobile ? 10 : 0 }}>
                        <InputLabel id="session-filter-label">Zobrazení</InputLabel>
                        <Select
                            labelId="session-filter-label"
                            id="session-filter"
                            value={filter}
                            onChange={handleFilterChange}
                            label="Sessions"
                        >
                            <MenuItem value="all">Vše</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="50">50</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
            <ResponsiveBar // Parametry pro graf a jeho následný styling
                data={sampleData}
                keys={['cpuUsage', 'numberOfProcesses']}
                indexBy='session'
                margin={isMobile ? { top: 20, right: 20, bottom: 50, left: 20 } : { top: 20, right: 50, bottom: 50, left: 70 }}
                enableArea={isDashboard}
                padding={0.3}
                groupMode='grouped'
                colors={[theme.palette.secondary.main, theme.palette.secondary[600]]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: (v) => {
                        if (isDashboard) return v.slice(0, 3);
                        return v;
                    },
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Relace',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Hodnoty',
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    fontSize: theme.typography.fontSize,
                    fontFamily: theme.typography.fontFamily,
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
            />
            {!isDashboard && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={isMobile ? .2 : 1}>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={page === 0}
                            onClick={() => changePage(-1)}
                        >
                            Přechozí
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={page >= totalPages - 1}
                            onClick={() => changePage(1)}
                            style={{ marginLeft: '10px' }}
                        >
                            Další
                        </Button>
                    </Box>
                    <Typography variant="body1">
                        Stránka {page + 1} ze {totalPages}
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default OverviewChart;
