import React from 'react';
import { Box } from 'grommet';

const Separator = () => {
    return (
        <Box direction={'row'}>
            <Box pad={'medium'} style={{ borderRight: '1px solid #CCCCCC' }}/>
            <Box pad={'medium'} />
        </Box>
    );
};

export default Separator;