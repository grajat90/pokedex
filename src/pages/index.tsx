import Head from "next/head";
import {useState} from "react";
import {Tab, Tabs} from "@mui/material";
import SearchByName from "~/_blocks/SearchByName";
import SearchMany from "~/_blocks/SearchMany";
import FilterablePokedexTable from "~/_components/FilterablePokedexTable";

export default function Home() {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <>
            <Head>
                <title>Pokédex</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="md:px-20 py-10 flex h-screen min-w-screen flex-col items-center justify-items-start bg-slate-50 gap-10">
                <div>
                    <span className="font-mono font-bold text-7xl text-amber-400 font-outline-4">Pokédex</span>
                </div>
                <Tabs value={selectedTab} onChange={(event, value: number) => {
                    setSelectedTab(value)
                }}>
                    <Tab label="Search by name"/>
                    <Tab label="Search many"/>
                    <Tab label="Search by type"/>
                </Tabs>
                {
                    selectedTab === 0 && <SearchByName />
                }
                {
                    selectedTab === 1 && <SearchMany />
                }
                {
                    selectedTab === 2 && <FilterablePokedexTable />
                }
            </main>
        </>
    );
}
