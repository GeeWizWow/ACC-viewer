import React from 'react';
import { map } from 'underscore';
import { useParams } from 'react-router-dom';
import { getPenaltiesBySession } from '../../redux/SimResults';
import { useSelector } from 'react-redux';
import { Box, Text } from 'grommet';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const Penalties = () => {
    const { id, sessionType } = useParams();
    const penalties = useSelector(s => getPenaltiesBySession(s, id, sessionType));

    return (
        <Box>
            <Box background={'background-front'} elevation={'small'} round={'small'} round={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'} round={{ corner: 'top', size: 'small' }}>
                    <Text weight={'bold'}>
                        Penalties
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
                                    Penalty
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Reason
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Lap
                                </Text>
                            </TableCell>

                            <TableCell scope={'col'} border={'bottom'}>
                                <Text size={'small'} weight={'bold'}>
                                    Served In Lap
                                </Text>
                            </TableCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(penalties, (p, index) => 
                            <TableRow key={`${p.driver}_${index}`}>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.driver}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.car}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.penalty}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.reason}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.lap || '-'}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== penalties.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {p.servedLap || '-'}
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

export default Penalties;