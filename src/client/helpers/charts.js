
export const getDefaultProps = (theme) => {
    return {
        colors: {
            scheme: theme === 'dark' ? 'accent' : 'nivo',
        },
        theme: {
            textColor: theme === 'dark' ? '#EEEEEE' : '#333333',
            grid: {
                line: {
                    stroke:  theme === 'dark' ? 'rgba(221, 221, 221, 0.2)' : 'rgb(221, 221, 221)',
                },
            },
            legends: {
                text: {
                    fill: theme === 'dark' ? '#EEEEEE' : '#333333',
                },
            },
        },
        margin: {
            top: 30, 
            right: 30, 
            bottom: 130, 
            left: 50,
        },
        axisTop: null,
        axisRight: null,
        axisBottom: {
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: tick => tick % 1 === 0 ? `Lap ${tick}` : '',
        },
        axisLeft: {
            orient: 'left',
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: tick => tick % 1 === 0 ? tick : '',
        },
        pointSize: 0,
        useMesh: true,
        legends: [
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
            },
        ],
    };
};