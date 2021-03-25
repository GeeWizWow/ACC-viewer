import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { map } from 'underscore';
import { getDriverLapsBySession, getTopLapsBySession } from '../../redux/BestLaps';
import { Box, Text } from 'grommet';
import { CarNames } from '../../helpers/constants';
import { msToTime } from '../../helpers/session';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const BestLaps = () => {

    const { id, sessionType } = useParams();
    const driverLaps = useSelector(s => getDriverLapsBySession(s, id, sessionType));
    const topLaps = useSelector(s => getTopLapsBySession(s, id, sessionType));

    return (
        <Box>

            <Box elevation={'small'}>
                <Box background={'light-1'} pad={'small'} border={'bottom'}>
                    <Text weight={'bold'}>
                        Per Driver
                    </Text>
                </Box>
                <Table>
                    <TableHeader>
                        <TableRow>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Driver
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Car
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Time
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Gap
                                </Text>
                            </TableCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(driverLaps, (lap, index) =>
                            <TableRow key={lap.driver}>
                                <TableCell scope={'row'} border={index !== driverLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {lap.driver}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== driverLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {CarNames[lap.car]}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== driverLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {msToTime(lap.time)}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== driverLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {lap.gap
                                            ? msToTime(lap.gap)
                                            : '-'
                                        }
                                    </Text>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </Box>

            <Box margin={'small'} />

            <Box elevation={'small'}>
                <Box background={'light-1'} pad={'small'} border={'bottom'}>
                    <Text weight={'bold'}>
                        Overall Top 20
                    </Text>
                </Box>
                <Table>
                    <TableHeader>
                        <TableRow>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Driver
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Car
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Time
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Gap
                                </Text>
                            </TableCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(topLaps, (lap, index) =>
                            <TableRow key={lap.time}>
                                <TableCell scope={'row'} border={index !== topLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {lap.driver}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== topLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {CarNames[lap.car]}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== topLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {msToTime(lap.time)}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== topLaps.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {lap.gap
                                            ? msToTime(lap.gap)
                                            : '-'
                                        }
                                    </Text>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </Box>

        </Box>
    );
};

export default BestLaps;
