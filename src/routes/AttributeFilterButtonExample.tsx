// (C) 2007-2020 GoodData Corporation
import React, { Component } from "react";
import { ErrorComponent, OnLoadingChanged, OnError } from "@gooddata/sdk-ui";
import { LineChart } from "@gooddata/sdk-ui-charts";
import {
    IAttributeFilter,
    IPositiveAttributeFilter,
    INegativeAttributeFilter,
    isPositiveAttributeFilter,
    filterIsEmpty,
    newNegativeAttributeFilter
} from "@gooddata/sdk-model";
import { Md } from "../md";
import { AttributeFilterButton } from "@gooddata/sdk-ui-filters";

interface IAttributeFilterExampleState {
    filters: Array<IPositiveAttributeFilter | INegativeAttributeFilter> | undefined;
    error: string | undefined;
}

export class AttributeFilterButtonExample extends Component<unknown, IAttributeFilterExampleState> {
    state: IAttributeFilterExampleState = {
        filters: [],
        error: undefined,
    };

    public onLoadingChanged: OnLoadingChanged = (...params) => {
        // eslint-disable-next-line no-console
        console.info("AttributeFilterExample onLoadingChanged", ...params);
    };

    public onApply = (filter: IAttributeFilter): void => {
        // eslint-disable-next-line no-console
        console.log("AttributeFilterExample onApply", filter);
        this.setState({ filters: [], error: undefined });
        if (isPositiveAttributeFilter(filter)) {
            this.filterPositiveAttribute(filter);
        } else {
            this.filterNegativeAttribute(filter);
        }
    };

    public onError: OnError = (...params) => {
        // eslint-disable-next-line no-console
        console.info("AttributeFilterExample onLoadingChanged", ...params);
    };

    public filterPositiveAttribute(filter: IPositiveAttributeFilter): void {
        let filters;
        const {
            positiveAttributeFilter: { displayForm },
        } = filter;
        const inElements = filter.positiveAttributeFilter.in;
        const checkLengthOfFilter = !filterIsEmpty(filter);
        if (checkLengthOfFilter) {
            filters = [
                {
                    positiveAttributeFilter: {
                        displayForm,
                        in: inElements,
                    },
                },
            ];
        } else {
            this.setState({
                error: "The filter must have at least one item selected",
            });
        }
        this.setState({ filters });
    }

    public filterNegativeAttribute(filter: INegativeAttributeFilter): void {
        let filters;
        const {
            negativeAttributeFilter: { notIn, displayForm },
        } = filter;
        const checkLengthOfFilter = !filterIsEmpty(filter);
        if (checkLengthOfFilter) {
            filters = [
                {
                    negativeAttributeFilter: {
                        displayForm,
                        notIn,
                    },
                },
            ];
        }
        this.setState({ filters });
    }

    public render(): React.ReactNode {
        const { filters, error } = this.state;

        return (
            <div className="s-attribute-filter">
                <AttributeFilterButton
                    filter={filters?.[0] ?? newNegativeAttributeFilter(Md.Account.Default, [])}
                    onApply={this.onApply}
                    onError={this.onError}
                />
                <div style={{ height: 300 }} className="s-line-chart">
                    {error ? (
                        <ErrorComponent message={error} />
                    ) : (
                        <LineChart
                            measures={[Md.BestCase]}
                            trendBy={Md.StageName.Default}
                            filters={filters}
                            onLoadingChanged={this.onLoadingChanged}
                            onError={this.onError}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AttributeFilterButtonExample;