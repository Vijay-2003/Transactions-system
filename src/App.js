import "./App.css";
import Transactions_Table from "./Components/TransactionsTable";
import Statistics from "./Components/Statistics";
import Chart from "./Components/Chart";

function App() {
  return (
    <div>
      <h1 className=" text-center text-lg font-semibold">Transaction Dashboard</h1>
      <Transactions_Table />
    </div>
  );
}

export default App;
