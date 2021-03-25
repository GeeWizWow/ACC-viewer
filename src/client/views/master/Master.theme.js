export default {
    // rounding: 4,
    spacing: 24,
    defaultMode: 'light',
    global: {
        rounding: {
            light: 4,
            dark: 20,
        },
        colors: {
            brand: {
                dark: '#7700cc',
                light: '#6600cc',
            },
            background: {
                dark: '#111111',
                light: '#FFFFFF',
            },
            'background-back': {
                dark: '#111111',
                light: '#EEEEEE',
            },
            'background-front': {
                dark: '#222222',
                light: '#FFFFFF',
            },
            'background-contrast': {
                dark: '#FFFFFF11',
                light: '#11111111',
            },
            'background-header': {
                dark: '#FFFFFF11',
                light: 'none',
            },
            'background-row': {
                dark: 'none',
                light: '#11111111',
            },
            text: {
                dark: '#EEEEEE',
                light: '#333333',
            },
            'text-strong': {
                dark: '#FFFFFF',
                light: '#000000',
            },
            'text-weak': {
                dark: '#CCCCCC',
                light: '#444444',
            },
            'text-xweak': {
                dark: '#999999',
                light: '#666666',
            },
            border: {
                dark: '#444444',
                light: '#CCCCCC',
            },
            control: 'brand',
            'active-background': 'background-contrast',
            'active-text': 'text-strong',
            'selected-background': 'brand',
            'selected-text': 'text-strong',
            'status-critical': '#FF4040',
            'status-warning': '#FFAA15',
            'status-ok': '#00C781',
            'status-unknown': '#CCCCCC',
            'status-disabled': '#CCCCCC',
            'graph-0': 'brand',
            'graph-1': 'status-warning',
        },
        font: {
            family: 'Helvetica',
        },
        active: {
            background: 'active-background',
            color: 'active-text',
        },
        hover: {
            background: 'active-background',
            color: 'active-text',
        },
        selected: {
            background: 'selected-background',
            color: 'selected-text',
        },
        elevation: {
            dark: {
                none: 'none',
                xsmall: 'none',
                small: 'none',
                medium: 'none',
                large: 'none',
                xlarge: 'none',
            },
        },
    },
    table: {
        header: {
            background: 'background-contrast',
        },
    },
    box: {
        extend: {
            // overflow: 'hidden',
        },
    },
    tip: {
        content: {
            background: 'white',
        },
    },
};
