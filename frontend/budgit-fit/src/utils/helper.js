export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" "); // Split by space to get words
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]; // Get the first letter of each word
    }
    return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) =>{
  const chartData = data.map((item)=>({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};




import moment from "moment";

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a,b)=> new Date(a.date)- new Date(b.date));
  const chartData = sortedData.map((item)=>({
    month : moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
}


export const prepareIncomeChartBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date)); // ✅ Correct sorting

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),  // ✅ Formatted date
    amount: item?.amount,                        // ✅ Amount pulled
    source: item?.source,                        // ✅ Source used
  }));

  return chartData;
};
