import React from 'react';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
      <>
        <div className='container'>
            <PageTitle>TODO LIST</PageTitle>
            <div className={styles.app__wrapper}>
                <AppHeader />
                <AppContent />
            </div>
        </div>
        <Toaster
            position='bottom-right'
            toastOptions={{
                style: {
                    fontSize: '1.5rem'
        }}
        }/>
      </>
  );
}

export default App;
