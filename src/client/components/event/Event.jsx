import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Text, Grid, Image } from 'grommet';
import { getTrackFlag, getTrackFriendlyName } from '../../helpers/events';
import { SessionTypes } from '../../helpers/constants';
import styles from './Event.scss';
import SessionIcon from '../session-icon/SessionIcon';
import { contains } from 'underscore';

const Event = ({ track, time, sessions, id }) => {

    const history = useHistory();
    const onClick = useCallback(() => history.push(`/event/${id}/${sessions[0]}/result`), [ id ]);

    return (
        <Box
            round={false}
            onClick={onClick}
            overflow={'hidden'}
            hoverIndicator={true}
            background={'background-front'}
            direction={'row'}
            align={'center'}
            justify={'between'}
            pad={{ right: 'medium' }}
            elevation={'small'}
            round={'small'}
        >

            <Box direction={'row'} align={'center'}>
                <div className={styles.flag}>
                    <Image 
                        src={getTrackFlag(track)} 
                        fit={'cover'}
                        className={styles.icon}
                        opacity={'strong'}
                    />
                </div>
                <Box direction={'column'}>
                    <Text weight={'bold'}>
                        {getTrackFriendlyName(track)}
                    </Text>
                    <Text size={'small'} color={'text-weak'}>
                        {moment(time).format('lll')}
                    </Text>
                </Box>
            </Box>


            <Grid 
                direction={'row'}
                columns={[ '24px', '24px', '24px' ]}
                gap={'small'}
            >
                <SessionIcon sessionType={contains(sessions, SessionTypes.FP) && SessionTypes.FP} />
                <SessionIcon sessionType={contains(sessions, SessionTypes.Q) && SessionTypes.Q} />
                <SessionIcon sessionType={contains(sessions, SessionTypes.R) && SessionTypes.R} />
               
            </Grid>

        </Box>
    );
};

Event.propTypes = {
    entrants: PropTypes.number,
    laps: PropTypes.number,
    sessionTypes: PropTypes.array,
    startTime: PropTypes.string,
    track: PropTypes.string,
    id: PropTypes.number,
};

export default Event;