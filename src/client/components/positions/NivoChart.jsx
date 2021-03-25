import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import { Box, Text } from 'grommet';
import Dot from '../dot/Dot'

export default ({ data, theme }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 30, bottom: 130, left: 30 }}
        colors={{ scheme: theme === 'dark' ? 'dark2' : 'nivo' }}
        xScale={{ 
            type: 'linear', 
            min: '1',
        }}
        yScale={{ 
            type: 'linear', 
            min: '1', 
            reverse: true,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: tick => tick % 1 === 0 ? tick : '',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: tick => tick % 1 === 0 ? tick : '',
        }}
        theme={{
            textColor: theme === 'dark' ? '#EEEEEE' : '#333333',
        }}
        tooltip={({ point: { serieColor, serieId, data: { x: lap, y: pos }}}) => 
            <Box pad={'xsmall'} background={'white'} round={'xsmall'}>
                <Box direction={'row'} gap={'small'} align={'center'}>
                    <Dot color={serieColor} />
                    <Text size={'small'} weight={'bold'}>
                        {serieId}
                    </Text>
                </Box>
                <Box direction={'row'} gap={'small'}>
                    <Text size={'small'} weight={'bold'}>Lap:</Text>
                    <Text size={'small'}>{lap}</Text>
                </Box>
                <Box direction={'row'} gap={'small'}>
                    <Text size={'small'} weight={'bold'}>Positon:</Text>
                    <Text size={'small'}>{pos}</Text>
                </Box>
            </Box>
        }
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 110,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
            }
        ]}
    />
);

