import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { INIT as INIT_SOCKET } from '../../utils/socketMiddleware';

export const useSocketMiddleware = () => {
    const dispatch = useDispatch();
    const init = () => dispatch({ type: INIT_SOCKET });
    useEffect(() => { init(); }, []);
};
