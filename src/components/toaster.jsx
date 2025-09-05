// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import {Toaster} from 'react-hot-toast';

export const ModifiedToast = () => {
    return (
        <Toaster toastOptions={{
            style: {
                background: '#363636',
                color: '#fff'
            },
            // Default options for specific types
            success: {
                duration: 3000,
                theme: {
                    primary: 'green',
                    secondary: 'black'
                }
            },
            error: {
                duration: 3000,
                theme: {
                    primary: 'red',
                    secondary: 'white'
                }
            }
        }}/>

    );
};