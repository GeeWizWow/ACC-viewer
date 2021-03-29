import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLapsBySession } from '../../redux/SimResults';
import { map } from 'underscore';
import { Box, Text } from 'grommet';
import { msToTime } from '../../helpers/events';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';
import LapIcon from '../lap-icon/LapIcon';

const getLapColor = (lap, sessionType) => {
    // if (!lap.isValid && sessionType === SessionTypes.R) {
    //     return null;
    // }

    return !lap.time
        ? 'neutral-4'
        : lap.isOverallBest
        ? 'brand'
        : lap.isPersonalBest
            ? 'neutral-3'
            : null;
};

const getSectorProps = (lap, sector) => {
    if (!lap.time) {
        return {};
    }

    return {
        weight: sector.isOverallBest ? 'bold' : null,
        color: sector.isPersonalBest ? 'status-ok' : null,
    };
};

const AllLaps = () => {
    const { id, sessionType } = useParams();
    const driverLaps = useSelector(s => getLapsBySession(s, id, sessionType));

    return (
        <Box>

            {map(driverLaps, d => 
                
                <Fragment key={d.name}>

                    <Box background={'background-front'} elevation={'small'}>
                        <Box background={'background-header'} pad={'small'} border={'bottom'}>
                            <Text weight={'bold'}>
                                {d.name}
                            </Text>
                        </Box>
                        <Table>
                            <TableHeader>
                                <TableRow>

                                    <TableCell scope={'col'} border={'bottom'} />

                                    <TableCell scope={'col'} border={'bottom'} align={'center'}>
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
                                        <TableCell 
                                            scope={'row'} 
                                            border={[ 'bottom', 'right' ]} 
                                            background={getLapColor(lap, sessionType)} 
                                            align={'center'}
                                        >
                                            <LapIcon 
                                                isInvalid={!lap.time}
                                                isOverallBest={lap.isOverallBest}
                                                isPersonalBest={lap.isPersonalBest}
                                            />
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)} align={'center'}>
                                            <Text size={'small'}>
                                                {lap.no}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'}>
                                                {lap.car}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'}>
                                                {lap.time 
                                                    ? msToTime(lap.time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[0])}>
                                                {lap.time 
                                                    ? msToTime(lap.sectors[0].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[1])}>
                                                {lap.time 
                                                    ? msToTime(lap.sectors[1].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[2])}>
                                                {lap.time 
                                                    ? msToTime(lap.sectors[2].time)
                                                    : '-'
                                                }
                                            </Text>
                                        </TableCell>
                                    </TableRow>
                                )}

                                <TableRow>
                                    <TableCell scope={'row'} border={'bottom'} colSpan={3}>
                                        <Text size={'small'}>
                                            Average
                                        </Text>
                                    </TableCell>
                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.average.time
                                                ? msToTime(d.average.time)
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.average.time
                                                ? msToTime(d.average.sectors[0])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.average.time
                                                ? msToTime(d.average.sectors[1])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'} border={'bottom'}>
                                        <Text size={'small'}>
                                            {d.average.time
                                                ? msToTime(d.average.sectors[2])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell scope={'row'} colSpan={3}>
                                        <Text size={'small'}>
                                            Best Possible
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossible.time
                                                ? msToTime(d.bestPossible.time)
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossible.time
                                                ? msToTime(d.bestPossible.sectors[0])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossible.time
                                                ? msToTime(d.bestPossible.sectors[1])
                                                : '-'
                                            }
                                        </Text>
                                    </TableCell>

                                    <TableCell scope={'row'}>
                                        <Text size={'small'}>
                                            {d.bestPossible.time
                                                ? msToTime(d.bestPossible.sectors[2])
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
