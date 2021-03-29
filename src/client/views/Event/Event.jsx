import React, { Fragment } from 'react';
import moment from 'moment';
import SessionIcon from '../../components/session-icon/SessionIcon';
import { map } from 'underscore';
import { Link, Route, Switch, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEventById } from '../../redux/SimResults';
import { getSessionName } from '../../helpers/events';
import { SessionTypes } from '../../helpers/constants';
import { Box, Heading, Text, Nav, Grid, Anchor } from 'grommet';
import { FormNext } from 'grommet-icons';

import Result from '../../components/result/Result';
import AllLaps from '../../components/all-laps/AllLaps';
import BestLaps from '../../components/best-laps/BestLaps';
import Consistency from '../../components/consistency/Consistency';
import Sectors from '../../components/sectors/Sectors';
import Positions from '../../components/positions/Positions';
// import Gaps from '../../components/gaps/Gaps';


const getSessionCategories = (sessionType) => {
    const defaults = [
        { label: 'Result', href: 'result', component: Result },
        { label: 'All Laps', href: 'laps', component: AllLaps },
        { label: 'Best Laps', href: 'bestlaps', component: BestLaps },
        { label: 'Consistency', href: 'consistency', component: Consistency },
        { label: 'Sectors', href: 'sectors', component: Sectors },
    ];

    switch (sessionType) {
        case SessionTypes.FP:
        case SessionTypes.Q: {
            return defaults
        }

        case SessionTypes.R: {
            return [
                ...defaults,
                { label: 'Positions', href: 'positions', component: Positions },
                // { label: 'Gaps', href: 'gaps', component: Gaps },
            ];
        }
    }
}

const Event = () => {

    const { id } = useParams();
    const { url, path } = useRouteMatch();

    const event = useSelector(s => getEventById(s, id));

    if (!event) {
        return null;
    }

    return (
        <Box>
            
            <Box direction={'row'} justify={'between'} align={'center'}>
                <Heading level={2}>
                    {event.track.toUpperCase()}
                </Heading>

                <Text size={'small'} color={'text-weak'}>
                    {moment(event.time).format('lll')}
                </Text>
            </Box>

            <Grid
                columns={[
                    'small',
                    'flex',
                ]}
                gap={'medium'}
            >

                <Box background={'background-front'} pad={'small'} gap={'large'} elevation={'small'}>
                    <Nav gap="small">

                        {map(event.sessions, s => 
                            <Fragment key={s}>
                                <Heading 
                                    level={4} 
                                    size={'medium'}
                                    margin={{ 
                                        vertical: 'small'
                                    }}
                                >
                                    <SessionIcon sessionType={s} />
                                    {' - '}
                                    {getSessionName(s)}
                                </Heading>

                                {map(getSessionCategories(s), category =>
                                    <Link 
                                        key={category.href}
                                        to={`${url}/${s}/${category.href}`}
                                    >
                                        <Anchor
                                            icon={( <FormNext /> )}
                                            size={'small'}
                                            as={'span'}
                                            weight={'normal'}
                                            color={'text-weak'}
                                            label={category.label}
                                        />
                                    </Link>
                                
                                )}
                                
                            </Fragment>
                        )}
                       
                    </Nav>
                </Box>

                <Box>
                    <Switch>

                        {map(event.sessions, s => 
                            map(getSessionCategories(s), category =>
                                <Route 
                                    path={`${path}/:sessionType/${category.href}`}
                                    component={category.component}
                                />
                            )
                        )}      

                        <Redirect to={`${path}/${event.sessions[0]}/result`} />

                    </Switch>
                </Box>

            </Grid>

        </Box>
    );
};

export default Event;