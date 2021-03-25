import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getResultsBySession } from '../../redux/Result';
import { Box, Text } from 'grommet';
import { getSessionName } from '../../helpers/events';
import { SessionTypes, CarNames } from '../../helpers/constants';
import { msToTime } from '../../helpers/session';
import { first, map } from 'underscore';

import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const Result = () => {
    const { id, sessionType } = useParams();
    const result = useSelector(s => getResultsBySession(s, id, sessionType));

    let listRows = [
        { key: 'Session', value: getSessionName(sessionType) },
        { key: 'Track', value: result.track.toUpperCase() },
        { key: 'Lasted laps', value: result.lastedLaps },
        { key: 'Best lap', value: result.bestLap.time ? `${result.bestLap.driver} (${result.bestLap.time})` : '-' },
    ];

    if (sessionType === SessionTypes.R) {
        listRows = [
            ...listRows,
            { key: 'Winner', value: result.winner || '-' },
            { key: 'Led Most Laps', value: result.ledMostLaps || '-' },
        ];
    }

    let tableColumns = [
        { property: 'position', header: 'Pos', align: 'center' },
        { property: 'no', header: 'No', align: 'center' },
        { property: 'driver', header: 'Driver' },
        { property: 'car', header: 'Car', render: ({ car }) => CarNames[car] },
        { property: 'laps', header: 'Laps', align: 'center' },
        { property: 'bestLap', header: 'Best lap', render: ({ bestLap }) => bestLap ? msToTime(bestLap) : '-' },
        { property: 'gap', header: 'Gap', render: ({ gap }) => gap ? msToTime(gap) : '-' },
    ];

    if (sessionType === SessionTypes.R) {
        tableColumns = [
            ...first(tableColumns, 5),
            { 
                property: 'timeFinished', 
                header: 'Time/Retired', 
                render: ({timeFinished, timeFinishedGap, position, laps}) => (
                    !timeFinishedGap && position > 1 
                        ? `+${result.lastedLaps - laps} laps`
                        : !timeFinishedGap && position === 1
                            ? msToTime(timeFinished)
                            : `+${msToTime(timeFinishedGap)}`
                ),
            },
            { property: 'bestLap', header: 'Best lap', render: ({ bestLap }) => bestLap ? msToTime(bestLap) : '-' },
            { property: 'consistency', header: 'Consistency', render: ({ consistency }) => `${consistency}%` },
            { property: 'led', header: 'Led', align: 'center', render: () => '-' },
        ];
    }

    return (
        <Box>

            <Box elevation={'small'}>
                {map(listRows, (row, index) => (
                    <Box 
                        key={row.key}
                        background={index % 2 ? 'white' : 'light-1'}
                        direction={'row'}
                        justify={'between'}
                        pad={{
                            vertical: 'xsmall',
                            horizontal: 'small',
                        }}
                        border={index !== listRows.length - 1 && 'bottom'}
                    >
                            <Text size={'small'}>
                                {row.key}
                            </Text>
                            <Text size={'small'}>
                                {row.value}
                            </Text>
                    </Box>
                ))}
            </Box>

            <Box margin={'small'} />

            <Box elevation={'small'}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {map(tableColumns, col => 
                                <TableCell 
                                    align={col.align} 
                                    scope={'col'} 
                                    border={'bottom'} 
                                    key={col.property}
                                >
                                    <Text size={'small'} weight={'bold'}>
                                        {col.header}
                                    </Text>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(result.leaderboard, (row, i) =>
                            <TableRow key={i}>
                                {map(tableColumns, col =>
                                    <TableCell 
                                        key={`${i}_${col.property}`} 
                                        scope={'row'} align={col.align} 
                                        border={i !== result.leaderboard.length -1 && 'bottom'}
                                    >
                                        <Text size={'small'}>
                                            {col.render ? col.render(row) : row[col.property]}
                                        </Text>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>

        </Box>
    );
};

export default Result;
