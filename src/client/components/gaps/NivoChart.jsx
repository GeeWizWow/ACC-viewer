import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getDefaultProps } from '../../helpers/charts';
import { msToTime } from '../../helpers/events';
import { Box } from 'grommet';
import ChartTooltip from '../chart-tooltip/ChartTooltip';

export default ({ data, theme }) => {

    const defaultChartProps = getDefaultProps(theme);
    const chartProps = {
        ...defaultChartProps,
        xScale: {
            type: 'linear', 
            min: '1',
        },
        yScale: {
            type: 'linear', 
            min: '0', 
            reverse: true,
        },
        axisLeft: {
            ...defaultChartProps.axisLeft,
            format: tick => tick % 1 === 0 ? `${tick}s` : '',
        },
        tooltip: ({ point: { serieColor, serieId, data: { x: lap, y: gap }}}) => (
            <ChartTooltip
                serieColor={serieColor}
                serieId={serieId}
                labelX={'Lap'}
                labelY={'Gap'}
                x={lap}
                y={msToTime(gap)}
            />
        ),
    };

    return (
        <Box height={'500px'}>
            <ResponsiveLine {...chartProps} data={data} />
        </Box>
    );
};

