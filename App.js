import { NavigationContainer } from '@react-navigation/native';
import LessorNavigation from './app/navigation/LessorNavigation';
import TenantNavigation from './app/navigation/TenantNavigation';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <LessorNavigation />
        {/* <TenantNavigation/> */}
      </NavigationContainer>
    </ApplicationProvider>
    
  )
}
export default App;