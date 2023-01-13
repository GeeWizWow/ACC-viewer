import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Grommet } from 'grommet';
import { Header, Box, Heading } from 'grommet';
import { useSocketMiddleware } from './Master.hooks';
import { useSelector } from 'react-redux';
import { getTheme } from '../../redux/App';

// Routes
import ThemeSelector from '../../components/theme-selector/ThemeSelector';
import Events from '../Events/Events';
import EventDetails from '../Event/Event';

// Ressources
import styles from './Master.scss';
import theme from './Master.theme';

// https://github.com/mauserrifle/simresults/blob/develop/lib/Simresults/Data/Reader/AssettoCorsaCompetizione.php
// https://simresults.net/remote?results=https%3A%2F%2Fsimresults.net%2Fexample.json&result=1

const GrommetProps = {
    full: true,
    theme: theme,
    // theme: grommet
};

const Master = () => {

    useSocketMiddleware();

    const theme = useSelector(getTheme);

    return (
        <Grommet {...GrommetProps} themeMode={theme}>
            <Box background={'background-back'} className={styles.wrapper}>
                <Header pad={'large'}>

                    <Heading level={2}>
                        <Link to={'/'} className={styles.mainLink}>
                            🏎️🏁👌
                        </Link>
                    </Heading>

                    <ThemeSelector />
                </Header>

                <Box 
                    className={styles.main}
                    pad={{
                        horizontal: 'large',
                        bottom: 'large',
                        top: 'small',
                    }} 
                >
                    <Switch>
                        <Route path={'/event/:id/:sessionType/:view'} component={EventDetails} />
                        <Route path={'/'} component={Events} /> 
                    </Switch>
                </Box>

            </Box>
        </Grommet>
    );
};

export default Master;
