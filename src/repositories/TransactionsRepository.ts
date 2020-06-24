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
    const resultBalance = this.transactions.reduce(
      (accumulator: Balance, { type, value }): Balance => {
        if (type === 'income') {
          return {
            ...accumulator,
            income: accumulator.income + value,
          };
        }
        if (type === 'outcome') {
          return {
            ...accumulator,
            outcome: accumulator.outcome + value,
          };
        }
        return accumulator;
      },
      { outcome: 0, income: 0, total: 0 } as Balance,
    );

    resultBalance.total = resultBalance.income - resultBalance.outcome;

    return resultBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
