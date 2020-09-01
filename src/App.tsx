import React from 'react';
import GlobalStyle from './styles/global';

import AppProvider from './context';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
        {/* <SignUp /> */}
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
