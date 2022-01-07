import React from "react";

import Page from "../components/Page";
import { BarChart } from "@gooddata/sdk-ui-charts";

// import { Dashboard } from "@gooddata/sdk-ui-dashboard";
// import { idRef } from "@gooddata/sdk-model";
//import { InsightView } from "@gooddata/sdk-ui-ext";
import { IPivotTableConfig, PivotTable } from "@gooddata/sdk-ui-pivot";
import { Md } from "../md";
//import AttributeFilterButtonExample from "./AttributeFilterButtonExample";
 //import {PivotTableApproximateCountExample} from "./PivotTableApproximateCountExample";

//dashboard component
//const dashboardRef = idRef("5f7c034c-77a7-4f2f-93d9-2b44efdbaf3c");

const style = { height: 500 };

//pivot table
const measures = [Md.BestCase];
const attributes = [Md.Account.Default];
const columns = [Md.StageName.Default];
const config: IPivotTableConfig = {
    columnSizing: {
        defaultWidth: "viewport",
        growToFit: true,
    },
};


const Home: React.FC = () => {
    return <Page>

<p>Pivot table -------------------------- </p>
        <div
            style={{ height: 300, resize: "both", overflow: "auto" }}
            className="s-pivot-table-columns-grow-to-fit">
            <PivotTable
                measures={measures}
                rows={attributes}
                columns={columns}
                config={config}
                pageSize={5}
            />
        </div>

        <p>bar chart ------------------ </p>
        <div style={style} className="s-bar-chart">
            <BarChart measures={measures} viewBy={Md.StageName.Default} />
        </div>


    </Page>;
};

export default Home;
