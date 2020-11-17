import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import RepositroyBrowser from './components/RepositoryBrowser';

function App() {
  return (  
   <Provider store={store}>
      <RepositroyBrowser />
   </Provider>
  );
}

export default App;
