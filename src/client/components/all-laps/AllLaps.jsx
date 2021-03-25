import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLapsBySession } from '../../redux/AllLaps';
import { map } from 'underscore';
import { Box, Text } from 'grommet';
import { CarNames } from '../../helpers/constants';
import { msToTime } from '../../helpers/session';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const getLapColor = (lap) => {
    if (!lap.isValid) {
        return null;
    }

    return lap.isOverallBest
        ? 'brand'
        : lap.isPersonalBest
            ? 'neutral-3'
            : null;
};

const getSectorProps = (lap, sector) => {
    if (!lap.isValid) {
        return {};
    }

    return {
        weight: sector.isOverallBest ? 'bold' : null,
        color: sector.isPersonalBest ? 'status-critical' : null,
    };
};

const AllLaps = () => {
    const { id, sessionType } = useParams();
    const driverLaps = useSelector(s => getLapsBySession(s, id, sessionType));

    return (
        <Box>

            {map(driverLaps, d => 
                
                <Fragment key={d.name}>

                    <Box elevation={'small'}>
                        <Box background={'light-1'} pad={'small'} border={'bottom'}>
                            <Text weight={'bold'}>
                                {d.name}
                            </Text>
                        </Box>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableCell scope={'col'} border={'bottom'}>
                                        <Text size={'small'} weight={'bold'}>
                                            Lap
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
                                            Sector 1
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'col'} border={'bottom'}>
                                        <Text size={'small'} weight={'bold'}>
                                            Sector 2
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'col'} border={'bottom'}>
                                        <Text size={'small'} weight={'bold'}>
                                            Sector 3
                                        </Text>
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {map(d.laps, (lap) =>
                                    <TableRow key={lap.no}>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'}>
                                                {lap.no}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'}>
                                                {CarNames[lap.car]}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'}>
                                                {lap.isValid
                                                    ? msToTime(lap.time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[0])}>
                                                {lap.isValid
                                                    ? msToTime(lap.sectors[0].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[1])}>
                                                {lap.isValid
                                                    ? msToTime(lap.sectors[1].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[2])}>
                                                {lap.isValid
                                                    ? msToTime(lap.sectors[2].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>
                                    </TableRow>
                                )}

                                <TableRow>
                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            Average
                                        </Text>
                                    </TableCell>
                                    <TableCell scope={'row'} border={'bottom'} />
                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.averageLap
                                                ? msToTime(d.averageLap)
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.averageLap
                                                ? msToTime(d.averageSectors[0])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.averageLap
                                                ? msToTime(d.averageSectors[1])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.averageLap
                                                ? msToTime(d.averageSectors[2])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            Best Possible
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} />

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossibleLap
                                                ? msToTime(d.bestPossibleLap)
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossibleLap
                                                ? msToTime(d.bestPossibleSectors[0])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossibleLap
                                                ? msToTime(d.bestPossibleSectors[1])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossibleLap
                                                ? msToTime(d.bestPossibleSectors[2])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Box>

                    <Box margin={'small'} />

                </Fragment>
                
            )}

        </Box>
    );
};

export default AllLaps;
