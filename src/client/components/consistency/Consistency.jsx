import React from 'react';
import { map } from 'underscore';
import { useParams } from 'react-router-dom';
import { getConsistencyBySession } from '../../redux/SimResults';
import { useSelector } from 'react-redux';
import { Box, Text } from 'grommet';
import { Table, TableHeader, TableBody, TableRow, TableCell } from 'grommet';

const Consistency = () => {
    const { id, sessionType } = useParams();
    const consistency = useSelector(s => getConsistencyBySession(s, id, sessionType));

    return (
        <Box>
            <Box background={'background-front'} elevation={'small'} round={'small'} round={'small'}>
                <Box background={'background-header'} pad={'small'} border={'bottom'} round={{ corner: 'top', size: 'small' }}>
                    <Text weight={'bold'}>
                        Consistency
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
                                    Consistency
                                </Text>
                            </TableCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {map(consistency, (d, index) => 
                            <TableRow key={d.driver}>
                                <TableCell scope={'row'} border={index !== consistency.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {d.driver}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== consistency.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {d.car}
                                    </Text>
                                </TableCell>
                                <TableCell scope={'row'} border={index !== consistency.length - 1 && 'bottom'}>
                                    <Text size={'small'}>
                                        {!d.consistency
                                            ? '-'
                                            : `${d.consistencyPc.toFixed(2)}% <-> ${d.consistency.toFixed(3)}`
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

export default Consistency;
