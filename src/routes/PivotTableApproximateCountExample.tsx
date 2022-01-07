// (C) 2007-2019 GoodData Corporation
import React from "react";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { LdmExt } from "../md";

const style = { height: 300 };

const measures = [
    LdmExt.countOfCustomerId,
    LdmExt.appxCountOfCustomerId,
];

const attributes = [LdmExt.Product_Name];

export const PivotTableApproximateCountExample: React.FC = () => {
    return (
        <div style={style} className={"pivot-table"}>
            <PivotTable 
                measures={measures} 
                rows={attributes} 
                pageSize={20} 
            />
        </div>
    );
};
