import { response } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    /*
    const transactionsIncome = this.transactionsRepository
      .all()
      .filter(t => t.type === 'income');
    const transactionsIncomeValues = transactionsIncome
      .map(t => t.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const transactionsOutcome = this.transactionsRepository
      .all()
      .filter(t => t.type === 'outcome');
    const transactionsOutcomeValues = transactionsOutcome
      .map(b => b.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    */

    /*
    if (type === 'outcome') {
      if (value > transactionsIncomeValues) {
        throw Error;
      }
    }
    */

    const total = this.transactionsRepository.getBalance();

    console.log(total.total);

    if (type === 'outcome') {
      if (value > total.total) {
        throw Error('asaaaa');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
