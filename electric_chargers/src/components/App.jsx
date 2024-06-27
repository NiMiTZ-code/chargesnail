import AuthProvider from "../provider/authProvider.jsx";
import Routes from "../routes/index.jsx"
function App() {
  return(
      <AuthProvider>
        <Routes />
      </AuthProvider>
  )
}

export default App;

