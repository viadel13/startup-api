
import styles from '../../assets/css/app.module.css';
import Root from '../../routes/route';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className={styles.app}>
      <Root />
      <ToastContainer draggable={false} />
    </div>
  )
}

export default App;