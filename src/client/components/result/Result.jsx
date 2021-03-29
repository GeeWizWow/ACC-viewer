import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getResultsBySession } from '../../redux/SimResults';
import { Box, Text } from 'grommet';
import { getSessionName, msToTime } from '../../helpers/events';
import { SessionTypes } from '../../helpers/constants';
import { first, map } from 'underscore';

import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const Result = () => {
    const { id, sessionType } = useParams();
    const result = useSelector(s => getResultsBySession(s, id, sessionType));

    let listRows = [
        { key: 'Session', value: getSessionName(result.type) },
        { key: 'Track', value: result.track.toUpperCase() },
        { key: 'Lasted laps', value: result.lastedLaps },
        { key: 'Best lap', value: result.bestlap ? `${result.bestlapDriver} (${msToTime(result.bestlap)})` : '-' },
    ];

    if (sessionType === SessionTypes.R) {
        listRows = [
            ...listRows,
            { key: 'Winner', value: result.winner || '-' },
            { key: 'Led Most Laps', value: result.ledMost || '-' },
        ];
    }

    let tableColumns = [
        { property: 'position', header: 'Pos', align: 'center' },
        { property: 'no', header: 'No', align: 'center' },
        { property: 'driver', header: 'Driver' },
        { property: 'car', header: 'Car' },
        { property: 'laps', header: 'Laps', align: 'center' },
        { property: 'bestlap', header: 'Best lap', render: ({ bestlap }) => bestlap ? msToTime(bestlap) : '-' },
        { property: 'gap', header: 'Gap', render: ({ gap }) => gap ? msToTime(gap) : '-' },
    ];

    if (sessionType === SessionTypes.R) {
        tableColumns = [
            ...first(tableColumns, 5),
            { 
                property: 'timeFinished', 
                header: 'Time/Retired', 
                render: ({time, timeGap, position, laps}) => (
                    position === 1
                        ? msToTime(time)
                        : result.lastedLaps > laps
                            ? `+${result.lastedLaps - laps} laps`
                            : timeGap
                                ? `+${msToTime(timeGap)}`
                                : '-'
                ),
            },
            { property: 'bestlap', header: 'Best lap', render: ({ bestlap }) => bestlap ? msToTime(bestlap) : '-' },
            // { property: 'consistency', header: 'Consistency', render: ({ consistencyPc }) => `${consistencyPc.toFixed(2)}%` },
            { property: 'led', header: 'Led', align: 'center', render: ({ led }) => led },
        ];
    }

    return (
        <Box>

            <Box background={'background-front'} elevation={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'}>
                    <Text weight={'bold'}>
                        Session Results
                    </Text>
                </Box>
                {map(listRows, (row, index) => (
                    <Box 
                        key={row.key}
                        background={index % 2 ? 'none' : 'background-row'}
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

            <Box background={'background-front'} elevation={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'}>
                    <Text weight={'bold'}>
                        Leaderboard
                    </Text>
                </Box>
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
