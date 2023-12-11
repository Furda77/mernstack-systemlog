import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import { useGetOverviewDataQuery } from "state/api"; // Fetchování dat ze state/api.js

const Overview = () => {
    const { data, isLoading } = useGetOverviewDataQuery(); // Fetchování dat ze state/api.js



    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Graf" subtitle="Využítí CPU v % k poměru běžících procesů během jedné relace" />
            <Box height="75vh">
                {/* Slouží pro zobrazení grafu na stránce*/}
                <OverviewChart data={data} isLoading={isLoading} />
            </Box>
        </Box>
    );
};

export default Overview;
