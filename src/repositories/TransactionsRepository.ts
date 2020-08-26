import { response } from 'express';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const inComeTransactions = this.transactions
      .filter(t => t.type === 'income')
      .map(b => b.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const outComeTransactions = this.transactions
      .filter(t => t.type === 'outcome')
      .map(b => b.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const balance: Balance = {
      income: inComeTransactions,
      outcome: outComeTransactions,
      total: inComeTransactions - outComeTransactions,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
