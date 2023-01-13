import React from 'react';
import { useSelector } from 'react-redux';
import { getEvents } from '../../redux/SimResults';
import { map } from 'underscore';
import { Box, Grid, Heading } from 'grommet';
import Event from '../../components/event/Event';

const Events = () => {

    const events = useSelector(getEvents);

    return (
        <Box>
            <Heading level={2}>
                Latest Events
            </Heading>
            <Grid
                fill={'horizontal'}
                gap={'small'}
            >
                {map(events, event =>
                    <Event
                        {...event}
                        key={event.id} 
                    /> 
                )}
            </Grid>
        </Box>
    );
};

export default Events;