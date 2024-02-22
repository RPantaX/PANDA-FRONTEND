import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"
import { store } from "./store/store"

function PandaApp() {

return(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)
}

export default PandaApp
