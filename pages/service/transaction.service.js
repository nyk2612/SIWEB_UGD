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

export function addExistingTransactions() {
    if (typeof window !== "undefined") {
        // Ambil data dari localStorage atau inisialisasi sebagai array kosong
        const transactionLocalStorage = JSON.parse(localStorage.getItem('transactions')) || [];
        
        // Filter transaksi baru yang belum ada di localStorage
        const newTransactions = transactionsData.filter(newTransaction => 
            !transactionLocalStorage.some(existingTransaction => existingTransaction.id === newTransaction.id)
        );

        // Gabungkan transaksi baru dengan transaksi yang sudah ada
        if (newTransactions.length > 0) {
            const updatedTransactions = [...transactionLocalStorage, ...newTransactions];
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        }

        return true;
    }
}

function getAllTransactionsData() {
    if(typeof window !== "undefined") {
        addExistingTransactions()
        const transactionLocalStorage = JSON.parse(localStorage.getItem('transactions'))
        return transactionLocalStorage
    }
}

export const getAllTransactions = getAllTransactionsData();

export function createTransaction(data) {
    if (typeof window !== "undefined") {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(data);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return true;
    }
    return false;
}