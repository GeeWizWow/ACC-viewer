import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getDefaultProps } from '../../helpers/charts';
import { Box } from 'grommet';
import ChartTooltip from '../chart-tooltip/ChartTooltip';

export default ({ data, theme }) => {

    const defaultChartProps = getDefaultProps(theme);
    const chartProps = {
        ...defaultChartProps,
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
        <Box height={'500px'}>
            <ResponsiveLine {...chartProps} data={data} />
        </Box>
    );
};

