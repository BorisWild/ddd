import React from 'react';

function NotificationHelp ( { text } ) {

    return (

      <div className="control-panels-bottom-notification" >
        <div className="container">
          <div className="d-flex justify-content-center w-100">
            {
              text !== '' ? (
                <div className="text-white fs-700 d-flex align-items-center">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                    <path d="M8.98437 8.48535L13.5093 18.0103C13.5438 16.9337 14.0994 16.3781 14.6549 15.8226L17.6848 18.8525L19.3515 17.1858L16.3216 14.1559C16.8964 13.6196 17.4519 13.064 18.5093 13.0103L8.98437 8.48535Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M10.5 6L13.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.01007 6.18899L1.49931 5.3677" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.25782 13.028L5.76361 9.99998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.54806 4.17035L8.7259 1.00036" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1396_2733">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                  </svg>

                  <span className="ml-2 text-help">{ text }</span>
                </div>
              ) : ''
            }
            
          </div>
        </div>
      </div>

    )

 }

 export default NotificationHelp;
