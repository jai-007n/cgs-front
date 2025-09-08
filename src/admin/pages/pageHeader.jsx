import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

PageHeader.defaultProps = {
      label: 'loading ...',
      addMenu: false,
    };
function PageHeader(props) {
    // Using object destructuring for cleaner access
    const { label, addMenu } = props;
    return (
        <div className="inline-flex items-center justify-between w-full">
            <h2 className="text-xl mb-3 font-bold text-gray-900  ">
                {label} 
            </h2>
            {addMenu ? '' :
                <Link to={-1} className="inline-flex items-center px-4 py-2 bg-gray-200 mb-3
                hover:bg-gray-300 text-gray-700 rounded-md transition-colors">
                    <FaArrowLeft className="text-gray-900 mr-2 font-normal" />
                    <span className="text-gray-900 text-md ">Go Back</span>
                </Link>
            }
        </div>
    );
}

export default PageHeader;