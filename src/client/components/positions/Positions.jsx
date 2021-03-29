import React from 'react';
import NivoChart from './NivoChart';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRacePositionsBySession } from '../../redux/SimResults';
import { getTheme } from '../../redux/App';
import { Box } from 'grommet';

const Positions = () => {

    const { id, sessionType } = useParams();
    const theme = useSelector(getTheme);
    const positions = useSelector(s => getRacePositionsBySession(s, id, sessionType));

    return (
        <Box>
            <Box height={'600px'} background={'background-front'} elevation={'small'}>

                <NivoChart data={positions} theme={theme} />

            </Box>
        </Box>
    );
};

export default Positions;
