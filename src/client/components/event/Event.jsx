import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Separator from '../separator/Separator';
import { Box, Text, Grid, Image, List } from 'grommet';
import { getTrackFlag, getTrackFriendlyName } from '../../helpers/tracks';
import styles from './Event.scss';
import SessionIcon from '../session-icon/SessionIcon';
import { map, range } from 'underscore';


const Event = ({ track, startTime, sessionTypes, id }) => {

    const history = useHistory();
    const onClick = useCallback(() => history.push(`/event/${id}/${sessionTypes[0]}/result`), [ id ]);

    return (
        <Box
            round={false}
            onClick={onClick}
            overflow={'hidden'}
            elevation={'small'}
            hoverIndicator={true}
            // background={'light-1'}
            direction={'row'}
            align={'center'}
            justify={'between'}
            pad={{ right: 'medium' }}
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
                    <Text>
                        {getTrackFriendlyName(track)}
                    </Text>
                    <Text size={'small'} color={'dark-4'}>
                        {moment(startTime).format('lll')}
                    </Text>
                </Box>
            </Box>


            <Grid 
                direction={'row'}
                columns={[ 'flex', 'flex', 'flex' ]}
                gap={'small'}
            >
                {map(sessionTypes, s => 
                    <SessionIcon 
                        key={s}
                        sessionType={s} 
                    />
                )}
                {map(range(3 - sessionTypes.length), (i) =>
                    <SessionIcon key={i} />
                )}
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