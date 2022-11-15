import { NavigationContainer } from '@react-navigation/native';
import LessorNavigation from './app/navigation/LessorNavigation';
import TenantNavigation from './app/navigation/TenantNavigation';
import Login from './app/screen/Login';
import Register from './app/screen/Register';
import ManageAccount from './app/screen/MangeAccount';
import AnnouceNews from './app/screen/tenant/AnnouceNews';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import axios from 'axios';

// const baseUrl = 'https://reqres.in'

// axios.get(`${baseUrl}/api/users`).then((response) => {
//   console.log(response.data);
// })

// const baseUrl ='http://10.111.3.135:8080';

// axios.get(`${baseUrl}/invoices`)
// .then((response) => {
//   console.log(response.data[0].room_number);
// })
// .catch(
//   (error) => console.log('error')
// )

import { EvaIconsPack } from '@ui-kitten/eva-icons';



const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
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
    </>
  )
}
export default App;