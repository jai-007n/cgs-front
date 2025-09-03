import React from 'react';
import * as FaIcons from 'react-icons/fa'; // Example for Font Awesome

const iconLibraries = {
    fa: FaIcons,
    // Add other libraries as needed
};

const DynamicIcon = ({ name, library, className, ...props }) => {
    const IconComponent = iconLibraries[library]?.[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in library "${library}"`);
        return null;
    }

    return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;