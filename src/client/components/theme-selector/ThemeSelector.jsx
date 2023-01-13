import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, getTheme } from '../../redux/App';
import { Grid, CheckBox } from 'grommet';

const ThemeSelector = () => {

    const dispatch = useDispatch();
    const theme = useSelector(getTheme);

    const handleChange = useCallback(() => dispatch(toggleTheme()), [ dispatch, toggleTheme ]);

    return (
        <Grid 
            direction={'row'}
            columns={[ 'flex', 'flex', 'flex' ]}
            justify={'center'}
        >
            ☀️
            <CheckBox 
                toggle
                onChange={handleChange}
                checked={theme === 'dark'}
            />
            🌙
        </Grid>
    )
};

export default ThemeSelector;