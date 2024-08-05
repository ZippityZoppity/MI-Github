import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import MainApp from './components/MainApp';
// import { Amplify } from 'aws-amplify';

// Amplify.configure({
//   API: {
//     REST: {
//       YourAPIName: {
//         endpoint:
//           'https://a07b1rmv31.execute-api.us-east-2.amazonaws.com',
//       }
//     }
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);