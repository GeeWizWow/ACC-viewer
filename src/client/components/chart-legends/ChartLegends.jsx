import React from 'react';
import { map } from 'underscore';
import { getLegendColor } from '../../helpers/charts';
import { Text, Box } from 'grommet';
import Dot from '../dot/Dot';

export default ({ data, theme }) => (
    <Box 
        direction={'row'} 
        gap={'xsmall'} 
        justify={'center'} 
        align={'center'}
        wrap={true}
        pad={'small'}
    >

        {map(data, (entry, index) => 
            <Box direction={'row'} justify={'between'} align={'center'} gap={'xsmall'} key={entry.id}>
                <Dot color={getLegendColor(theme, index)} />
                <Text size={'xsmall'}>{entry.id}</Text>
            </Box>
        )}

    </Box>
);
