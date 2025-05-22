import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import './Home.css';  // Import the CSS directly
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';

import RecentIncome from "../../components/Dashboard/RecentIncome";

import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if (response.data) {
                setDashboardData(response.data);
  console.log("🚀 Dashboard Data:", response.data);
  console.log("🚀 Last 60 Days Income:", response.data?.last60DaysIncome);
  console.log("🚀 Income Transactions:", response.data?.last60DaysIncome?.transactions);
  console.log("🚀 Total Income Raw:", response.data?.totalIncome);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);
    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="wrapper">
                <div className="cardGrid">
                     <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpenses ?? 0)}
                        color="bg-red-500"
                    /> 
                </div>
                <div className="recentGrid">
                    <div><RecentTransactions
                        transactions = {dashboardData?.recentTransactions}
                        onSeeMore = {()=> navigate("/expense")} />
                    </div>
                    <div><FinanceOverview 
                        totalBalance = {dashboardData?.totalBalance ||0}
                        totalIncome = {dashboardData?.totalIncome ||0}
                        totalExpense = {dashboardData?.totalExpenses ||0} />
                    </div>    
                    <div><Last30DaysExpenses data={dashboardData?.last30DaysExpenses?.transactions || []} /> 
                    </div>
                    <div><ExpenseTransactions transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore={()=> navigate("/expense")}>
                        </ExpenseTransactions>
                     </div> 
                    
                    <div><RecentIncome 
                     transactions={dashboardData?.last60DaysIncome?.transaction || []}
                     onSeeMore={() => navigate("/income")}/>
                    </div>
                    <div><RecentIncomeWithChart data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
                     totalIncome={dashboardData?.totalIncome?.totalIncome?.[0]?.total || 0}
                /></div>
                


                
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
