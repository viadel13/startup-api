
import styles from '../../assets/css/app.module.css';
import Root from '../../routes/route';
import { ToastContainer } from 'react-toastify';

function App() {
  
  console.log("%c Welcome to API REST", "color:white; background:#1e2122; font-size: 25px; text-align: center; text-transform: uppercase;padding: 3px;")
  return (
    <div className={styles.app}>
      <Root />
      <ToastContainer autoClose={1000} draggable={false} />
    </div>
  )
}

export default App;