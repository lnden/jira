import React from 'react';
import './App.css';

import { useAuth } from './context/auth-context';
// import { ProjectListScreen } from './screens/project-list/index'
// import { TsReactTest } from './try-use-array'
// import { LoginScreen } from "./screens/login";
import { AuthenicatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenicatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
