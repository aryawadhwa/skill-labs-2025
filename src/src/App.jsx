import { useState, useMemo } from 'react'
import './App.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CUSTOM_COLORS = [
  'rgba(99, 102, 241, 0.8)',
  'rgba(34, 197, 94, 0.8)',
  'rgba(249, 115, 22, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(107, 114, 128, 0.8)'
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function App() {
  const [expenses, setExpenses] = useState([
    { category: "Food", amount: 350, month: "November" },
    { category: "Travel", amount: 120, month: "October" },
    { category: "Utilities", amount: 80, month: "August" },
    { category: "Entertainment", amount: 200, month: "November" },
    { category: "Other", amount: 50, month: "May" },
  ]);

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);


  const monthlyData = useMemo(() => {
    const monthlyMap = MONTHS.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

    expenses.forEach(exp => {
      monthlyMap[exp.month] += exp.amount;
    });

    const data = MONTHS.map(month => monthlyMap[month]);

    return {
      labels: MONTHS,
      datasets: [
        {
          label: 'Total Spending (Rs.)',
          data: data,
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 1,
        },
      ],
    };
  }, [expenses]);

  const chartData = {
    labels: expenses.map(e => e.category),
    datasets: [
      {
        label: 'Amount',
        data: expenses.map(e => e.amount),
        backgroundColor: CUSTOM_COLORS,
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { position: 'right', labels: { padding: 20, font: { size: 12 } } },
      title: { display: true, text: 'Category Distribution (Pie Chart)', color: '#14532d', font: { size: 16, weight: 'bold' } },
    }
  };

  return (
    <>
      <div>
        <nav className="bg-green-700">
          <div className="top flex justify-between items-center">

            <div className="logo flex justify-start items-center p-1 px-10 cursor-pointer">
              <div className="image">
                <lord-icon
                  src="https://cdn.lordicon.com/kkdnopsh.json"
                  trigger="hover"
                  state="hover-spending"
                  colors="primary:#ffffff,secondary:#08a88a"
                  style={{ width: '50px', height: '50px' }}

                ></lord-icon>
              </div>
              <div className="text-white font-bold text-xl px-2">XPaise</div>
            </div>
            <div className="spent px-5 text-white font-bold flex  ">
              <div className="amount border-2 border-white p-2  flex justify-center rounded-lg">

                <div className="total">Total :</div>
                <div className="money">470</div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="content flex ">
        <div className="left">
          <div className="form p-2 bg-green-100 rounded-md w-full m-5 border-2 border-green-900 shadow-lg">
            <form className="w-full my-2 px-5">
              <div className="category">
                <div className="expense_type flex flex-col">
                  <div className="select_cat font-bold py-2">Select Category :</div>
                  <div className="select w-[25%]">
                    <select
                      name="expense_type"
                      id="expense_type"
                      className="border-2 border-gray-300 rounded-md p-2 mt-2 focus:border-green-900 outline-none bg-white"
                    >
                      <option value="food">Food</option>
                      <option value="travel">Travel</option>
                      <option value="utilities">Utilities</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="amount">
                <div className="total font-bold py-2">Enter Amount :</div>
                <div className="input_amount w-[25%] mt-2">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="border-2 border-gray-300 rounded-md p-2 bg-white focus:border-green-900 outline-none"
                    placeholder="Amount in Rs."
                  />
                </div>
              </div>

              <div className="month">
                <div className="month flex flex-col">
                  <div className="select_cat font-bold py-2">Select Month :</div>
                  <div className="select w-[25%]">
                    <select
                      name="month_type"
                      id="month_type"
                      className="border-2 border-gray-300 rounded-md p-2 mt-2 focus:border-green-900 outline-none bg-white"
                    >
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                      <option value="april">April</option>
                      <option value="may">May</option>
                      <option value="june">June</option>
                      <option value="july">July</option>
                      <option value="august">August</option>
                      <option value="september">September</option>
                      <option value="october">October</option>
                      <option value="november">November</option>
                      <option value="december">December</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="add">
                <button
                  type="submit"
                  className="bg-green-700 text-white font-bold rounded-md p-2 mt-4 hover:bg-green-900"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
          {/* //Expense Logs */}
          <div className="logs">
            <div className="table border-2 border-green-900 rounded-lg w-full overflow-hidden m-5  bg-gray-100 shadow-lg">
              <table border="1" className="w-full text-center">

                <tr>
                  <th className='p-3 '>S.no.</th>
                  <th className='p-3 '>Category</th>
                  <th className='p-3 '>Amount (Rs.)</th>
                  <th className='p-3 '>Month</th>
                </tr>
                <tr>
                  <td className='p-3'>1.</td>
                  <td className='p-3'>Entertaiment</td>
                  <td className='p-3'>300</td >
                  <td className='p-3'>November</td >
                </tr>
                <tr>
                  <td className='p-3'>2.</td>
                  <td className='p-3'>Food</td>
                  <td className='p-3'>100</td  >
                  <td className='p-3'>November</td >
                </tr>
                <tr>
                  <td className='p-3'>3.</td>
                  <td className='p-3'>Travel</td>
                  <td className='p-3'>70</td  >
                  <td className='p-3'>November</td >
                </tr>

              </table>
            </div>
          </div>
        </div>
        <div className="right px-10 flex justify-center w-full flex-col ">
          <div className="pi ">
            <div className="flex-col  piechart border-2 border-green-900 rounded-lg w-full m-5 bg-gray-100 shadow-lg flex justify-center items-center">
              <div className="text-green-900 font-bold text-center p-2 bg-gray-300 w-full border-white rounded-sm ">Expenditure chart</div>
              <div className="pie">
                <Doughnut
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
          <div className="monthly">
            <div className="flex-col piechart border-2 border-green-900 rounded-lg w-full m-5 bg-white shadow-lg flex justify-center items-center p-5 h-[550px]">
              <div className="text-green-900 font-bold text-center p-2 bg-gray-300 w-full border-white rounded-sm mb-4">Monthly Spend</div>
              <div className="pie relative w-full h-full">
                <Bar
                  data={monthlyData}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
