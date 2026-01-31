
import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Screen } from './types';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import ConsentScreen from './screens/ConsentScreen';
import Dashboard from './screens/Dashboard';
import RaiseIssueFlow from './screens/RaiseIssueFlow';
import TrackRequests from './screens/TrackRequests';
import VaultScreen from './screens/VaultScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdvocateListScreen from './screens/AdvocateListScreen';
import SecurityScreen from './screens/SecurityScreen';
import AdvocateCallScreen from './screens/AdvocateCallScreen';
import AdvocateChatScreen from './screens/AdvocateChatScreen';
import EmergencyCallScreen from './screens/EmergencyCallScreen';
import CivicHighlights from './screens/CivicHighlights';
import NotificationManager from './components/NotificationManager';

const Router: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case Screen.LOGIN: return <LoginScreen />;
    case Screen.OTP: return <OTPScreen />;
    case Screen.CONSENT: return <ConsentScreen />;
    case Screen.DASHBOARD: return <Dashboard />;
    case Screen.RAISE_ISSUE_OPTIONS:
    case Screen.FILE_ONLINE:
    case Screen.SPEAK_AND_FILE:
    case Screen.ASSISTED_HELP:
    case Screen.AI_REVIEW:
    case Screen.SUBMISSION_ANIMATION:
      return <RaiseIssueFlow />;
    case Screen.TRACK_REQUESTS:
    case Screen.TRACK_DETAIL:
      return <TrackRequests />;
    case Screen.DOCUMENT_VAULT:
      return <VaultScreen />;
    case Screen.PROFILE:
    case Screen.EDIT_PROFILE:
      return <ProfileScreen />;
    case Screen.HIRE_ADVOCATE:
      return <AdvocateListScreen />;
    case Screen.SECURITY_SETTINGS:
      return <SecurityScreen />;
    case Screen.ADVOCATE_CALL:
      return <AdvocateCallScreen />;
    case Screen.ADVOCATE_CHAT:
      return <AdvocateChatScreen />;
    case Screen.EMERGENCY_RINGING:
      return <EmergencyCallScreen />;
    case Screen.CIVIC_HIGHLIGHTS:
      return <CivicHighlights />;
    default:
      return <Dashboard />;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <NotificationManager />
      <Router />
    </AppProvider>
  );
};

export default App;
