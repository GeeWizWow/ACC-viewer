import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { map } from 'underscore';
import { getSectorsBySession } from '../../redux/Sectors';
import { Box, Text } from 'grommet';
import { CarNames } from '../../helpers/constants';
import { msToTime } from '../../helpers/session';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const getSectorName = (i) => {
    return [ 'One', 'Two', 'Three' ][i];
};

const Sectors = () => {

    const { id, sessionType } = useParams();
    const sectors = useSelector(s => getSectorsBySession(s, id, sessionType));

    return (
        <Box>

            {map(sectors, (s, i) =>
                <Fragment key={i}>

                    <Box elevation={'small'}>
                        <Box background={'light-1'} pad={'small'} border={'bottom'}>
                            <Text weight={'bold'}>
                                Sector {getSectorName(i)}
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
                                {map(s, (lap, index) =>
                                    <TableRow key={lap.driver}>
                                        <TableCell scope={'row'} border={index !== s.length - 1 && 'bottom'}>
                                            <Text size={'small'}>
                                                {lap.driver}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={index !== s.length - 1 && 'bottom'}>
                                            <Text size={'small'}>
                                                {CarNames[lap.car]}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={index !== s.length - 1 && 'bottom'}>
                                            <Text size={'small'}>
                                                {msToTime(lap.time)}
                                            </Text>
                                        </TableCell>
                                        <TableCell scope={'row'} border={index !== s.length - 1 && 'bottom'}>
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

                </Fragment>
            )}

        </Box>
    );
};

export default Sectors;
