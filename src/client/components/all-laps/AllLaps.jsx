import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLapsBySession } from '../../redux/AllLaps';
import { map } from 'underscore';
import { Box, Text } from 'grommet';
import { CarNames, SessionTypes } from '../../helpers/constants';
import { msToTime } from '../../helpers/session';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';
import LapIcon from '../lap-icon/LapIcon';

const getLapColor = (lap, sessionType) => {
    // if (!lap.isValid && sessionType === SessionTypes.R) {
    //     return null;
    // }

    return !lap.isValid
        ? 'neutral-4'
        : lap.isOverallBest
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
                                                isInvalid={!lap.isValid}
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
                                                {CarNames[lap.car]}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'}>
                                                {msToTime(lap.time)}
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[0])}>
                                                {msToTime(lap.sectors[0].time)}
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[1])}>
                                                {msToTime(lap.sectors[1].time)}
                                            </Text>
                                        </TableCell>

                                        <TableCell scope={'row'} border={'bottom'} background={getLapColor(lap, sessionType)}>
                                            <Text size={'small'} {...getSectorProps(lap, lap.sectors[2])}>
                                                {msToTime(lap.sectors[2].time)}
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
                                    <TableCell scope={'row'} colSpan={3}>
                                        <Text size={'small'}>
                                            Best Possible
                                        </Text>
                                    </TableCell>

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
