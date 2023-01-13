import { colorSchemes } from '@nivo/colors';

export const getColorScheme = (theme) => {
    const name = theme === 'dark' ? 'accent' : 'nivo';
    const scheme = theme === 'dark' ? colorSchemes.accent : colorSchemes.nivo;

    return { name, scheme };
};

export const getLegendColor = (theme, index) => {
    const { scheme } = getColorScheme(theme);
    return scheme[index % scheme.length];
};

export const getDefaultProps = (theme) => {
    return {
        colors: {
            scheme: getColorScheme(theme).name,
        },
        theme: {
            textColor: theme === 'dark' ? '#EEEEEE' : '#333333',
            grid: {
                line: {
                    stroke:  theme === 'dark' ? 'rgba(221, 221, 221, 0.2)' : 'rgb(221, 221, 221)',
                },
            },
        },
        curve: 'monotoneX',
        margin: {
            top: 30, 
            right: 30, 
            bottom: 30, 
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
        enablePoints: false,
        useMesh: true,
        // legends: [
        //     {
        //         anchor: 'top-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     },
        // ],
    };
};