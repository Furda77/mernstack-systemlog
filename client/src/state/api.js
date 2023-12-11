//Tento dokoument slouží pro "spojení" front-endu s back-endem

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Endpointy
// getUser: Fetchuje uživatelé pomocí ID s tagem "User" - Nyní nevyužito. Do budoucna vhodné fuknci přihlášení a pro rozdělení uživatelů - SuperAdmin, Admin, uživatel.
// getAdmins: Odesílá zpět seznam uživatelů s tagem "admin".
// getSystemData: Dostává systemová data se stránkováním, rozdělením, a vyhledávacími prvky. S tagem "System Data".
// getDashboardData: Fetchuje data pro hlavní panel s pomocí tagu "Dashboard".
// insertSystemData: Povoluje vložení dat do databáze - formulář.
// getOverviewData: Získává data pro graf s odpovědí transformace pro CPU vytížení a celkový počet procesů.  S tagem "Overview Data".

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Admins", "SystemData", "DataInsert",],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getSystemData: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/systemdata",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["System Data"]
        }),
        getDashboardData: build.query({
            query: () => "/dashboard",
            providesTags: ["Dashboard"]
        }),
        insertSystemData: build.mutation({
            query: (data) => ({
                url: "client/systemdata", // Endpoint URL 
                method: "POST", // Určuje metodu POST pro vkládání do databáze
                body: data, // Data to be sent in the request body
            }),
            invalidatesTags: ["SystemData"],
        }),
        getOverviewData: build.query({
            query: () => "overview", // Musí být stejná s back-end url 
            providesTags: ["Overview Data"],
            transformResponse: (response) => {
                // Transofarmace odpovědi, pro využití na stránce Overview/Grafy-přehled:
                return response.map((dataPoint) => ({
                    cpu_usage_percent: dataPoint.cpu_usage_percent,
                    number_of_processes: dataPoint.number_of_processes,
                }));
            },
        }),
    }),
})


export const {
    useGetUserQuery,
    useGetAdminsQuery,
    useGetSystemDataQuery,
    useGetDashboardDataQuery,
    useInsertSystemDataMutation,
    useGetOverviewDataQuery,
} = api;