import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { map } from 'underscore';
import { getDriverLapsBySession, getTopLapsBySession } from '../../redux/SimResults';
import { Box, Text } from 'grommet';
import { msToTime } from '../../helpers/events';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const BestLaps = () => {

    const { id, sessionType } = useParams();
    const driverLaps = useSelector(s => getDriverLapsBySession(s, id, sessionType));
    const topLaps = useSelector(s => getTopLapsBySession(s, id, sessionType));

    return (
        <Box>

            <Box background={'background-front'} elevation={'small'} round={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'} round={{ corner: 'top', size: 'small' }}>
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

                            <TableCell scope={'col'} border={'bottom'} align={'center'}>
                                <Text size={'small'} weight={'bold'}>
                                    Lap
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
                                        {lap.car}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== driverLaps.length - 1 && 'bottom'} align={'center'}>
                                    <Text size={'small'}>
                                        {lap.no}
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

            <Box background={'background-front'} elevation={'small'} round={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'} round={{ corner: 'top', size: 'small' }}>
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

                            <TableCell scope={'col'} border={'bottom'} align={'center'}>
                                <Text size={'small'} weight={'bold'}>
                                    Lap
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
                                        {lap.car}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== topLaps.length - 1 && 'bottom'} align={'center'}>
                                    <Text size={'small'}>
                                        {lap.no}
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
