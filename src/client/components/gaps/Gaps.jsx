import React from 'react';
import NivoChart from './NivoChart';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRaceGapsBySession } from '../../redux/SimResults';
import { getTheme } from '../../redux/App';
import { Box } from 'grommet';

const Gaps = () => {

    const { id, sessionType } = useParams();
    const theme = useSelector(getTheme);
    const gaps = useSelector(s => getRaceGapsBySession(s, id, sessionType));

    return (
        <Box>
            <Box height={'600px'} background={'background-front'} elevation={'small'} round={'small'}>

                <NivoChart data={gaps} theme={theme} />

            </Box>
        </Box>
    );
};

export default Gaps;
