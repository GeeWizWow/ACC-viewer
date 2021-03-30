import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getDefaultProps } from '../../helpers/charts';
import ChartTooltip from '../chart-tooltip/ChartTooltip';

export default ({ data, theme }) => {

    const defaultChartProps = getDefaultProps(theme);
    const chartProps = {
        ...defaultChartProps,
        data: data,
        xScale: {
            type: 'linear', 
            min: '2',
        },
        yScale: {
            type: 'linear', 
            min: '1', 
            reverse: true,
        },
        tooltip: ({ point: { serieColor, serieId, data: { x: lap, y: pos }}}) => (
            <ChartTooltip
                serieColor={serieColor}
                serieId={serieId}
                labelX={'Lap'}
                labelY={'Position'}
                x={lap}
                y={pos}
            />
        ),
    };

    return (
        <ResponsiveLine {...chartProps} />
    );
};

