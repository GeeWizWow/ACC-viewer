import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRacePositionsBySession } from '../../redux/Race';
import { Box } from 'grommet';
import NivoChart from './NivoChart';

const Positions = () => {

    const { id, sessionType } = useParams();
    const positions = useSelector(s => getRacePositionsBySession(s, id, sessionType));

    return (
        <Box>
            <Box elevation={'small'} height={'600px'}>

                <NivoChart data={positions} />

            </Box>
        </Box>
    );
};

export default Positions;
