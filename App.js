import { NavigationContainer } from '@react-navigation/native';
import LessorNavigation from './app/navigation/LessorNavigation';
import TenantNavigation from './app/navigation/TenantNavigation';
import Login from './app/screen/Login';
import Register from './app/screen/Register';
import ManageAccount from './app/screen/MangeAccount';
import AnnouceNews from './app/screen/tenant/AnnouceNews';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <LessorNavigation />
        {/* <TenantNavigation/> */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <ManageAccount /> */}
        {/* <AnnouceNews /> */}
      </NavigationContainer>
    </ApplicationProvider>
    
  )
}
export default App;