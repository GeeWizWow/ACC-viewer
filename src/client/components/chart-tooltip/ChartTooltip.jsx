import React from 'react';
import Dot from '../dot/Dot'
import { Box, Text } from 'grommet';

export default ({ serieColor, serieId, labelX, labelY, x, y }) => (
    <Box pad={'xsmall'} background={'white'} round={'xsmall'} elevation={'small'}>
        <Box direction={'row'} gap={'small'} align={'center'}>
            <Dot color={serieColor} />
            <Text size={'small'} weight={'bold'}>
                {serieId}
            </Text>
        </Box>
        <Box direction={'row'} gap={'small'}>
            <Text size={'small'} weight={'bold'}>{labelX}:</Text>
            <Text size={'small'}>{x}</Text>
        </Box>
        <Box direction={'row'} gap={'small'}>
            <Text size={'small'} weight={'bold'}>{labelY}:</Text>
            <Text size={'small'}>{y}</Text>
        </Box>
    </Box>
);