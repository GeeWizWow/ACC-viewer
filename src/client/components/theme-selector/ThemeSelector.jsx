import React, { useState, useCallback } from 'react';
import { Grid, CheckBox } from 'grommet';

const ThemeSelector = ({ onChange }) => {

    return (
        <Grid 
            direction={'row'}
            columns={[ 'flex', 'flex', 'flex' ]}
            justify={'center'}
        >
            ☀️
            <CheckBox 
                toggle
            />
            🌙
        </Grid>
    )
};

export default ThemeSelector;