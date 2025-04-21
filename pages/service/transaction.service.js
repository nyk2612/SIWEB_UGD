import { transactionsData } from "./data/transactions"

function totalRevenue() {
    const completedTransactions = transactionsData.filter(transaction => transaction.status === "Selesai");
    
    const income = completedTransactions.reduce((total, transaction) => {
        return total + parseInt(transaction.amount); // Menggunakan parseInt untuk mengubah string menjadi angka
    }, 0);
    
    const formattedTotal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(income);

    return formattedTotal;
}
export const totalIncome = totalRevenue();

