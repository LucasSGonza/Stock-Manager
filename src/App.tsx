import { useEffect } from "react";
import { AppLayout } from "./components";
import WebRouter from "./routes/WebRouter";
import { useAppDispatch } from "./store/hooks";
import { updateStockList } from "./store/stock/stockSlice";
import { mockedClothes } from "./util";

function App() {
  const dispatch = useAppDispatch();

  // Update the stock list in the Redux store when the app mounts
  useEffect(() => {
    dispatch(updateStockList(mockedClothes));
  }, [dispatch]);

  return (
    <AppLayout>
      <WebRouter />
    </AppLayout>
  );
}

export default App;
