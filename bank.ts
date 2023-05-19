// Bank class representing the banking system
class Bank {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  // Add account to the bank
  addAccount(account: Account) {
    this.accounts.push(account);
  }

  // Find account by account number
  findAccount(accountNumber: string): Account | undefined {
    return this.accounts.find(account => account.getAccountNumber() === accountNumber);
  }

  // Deposit money into an account
  deposit(accountNumber: string, amount: number) {
    const account = this.findAccount(accountNumber);
    if (account) {
      account.deposit(amount);
      console.log(`Successfully deposited $${amount} into Account ${accountNumber}`);
    } else {
      console.log(`Account ${accountNumber} not found`);
    }
  }

  // Withdraw money from an account
  withdraw(accountNumber: string, amount: number) {
    const account = this.findAccount(accountNumber);
    if (account) {
      if (account.getBalance() >= amount) {
        account.withdraw(amount);
        console.log(`Successfully withdrew $${amount} from Account ${accountNumber}`);
      } else {
        console.log(`Insufficient balance in Account ${accountNumber}`);
      }
    } else {
      console.log(`Account ${accountNumber} not found`);
    }
  }

  // Transfer money between accounts
  transfer(senderAccountNumber: string, receiverAccountNumber: string, amount: number) {
    const senderAccount = this.findAccount(senderAccountNumber);
    const receiverAccount = this.findAccount(receiverAccountNumber);

    if (senderAccount && receiverAccount) {
      if (senderAccount.getBalance() >= amount) {
        senderAccount.withdraw(amount);
        receiverAccount.deposit(amount);
        console.log(`You have successfully transferred $${amount} from Account ${senderAccountNumber} to Account ${receiverAccountNumber}`);
      } else {
        console.log(`Insufficient balance in Account ${senderAccountNumber}`);
      }
    } else {
      console.log(`Invalid Account. Please ensure you entered the details correctly`);
    }
  }
}

// Account class representing a user account
class Account {
  private accountNumber: string;
  private balance: number;
  private ownerName: string;

  constructor(accountNumber: string, ownerName: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.ownerName = ownerName;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getBalance(): number {
    return this.balance;
  }

  getOwnerName(): string {
    return this.ownerName;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }
}

// Create an instance of the Bank
const bank = new Bank();

// Example usage:
const account1 = new Account("1234567890", "John Doe");
bank.addAccount(account1);

// Deposit button click handler
const depositBtn = document.getElementById('depositBtn');
depositBtn.addEventListener('click', function () {
  const accountNumber = document.getElementById('depositAccountNumber').value;
  const amount = parseFloat(document.getElementById('depositAmount').value);

  bank.deposit(accountNumber, amount);
});

// Withdraw button click handler
const withdrawBtn = document.getElementById('withdrawBtn');
withdrawBtn.addEventListener('click', function () {
  const accountNumber = document.getElementById('withdrawAccountNumber').value;
  const amount = parseFloat(document.getElementById('withdrawAmount').value);

  bank.withdraw(accountNumber, amount);
});

// Transfer button click handler
const transferBtn = document.getElementById('transferBtn');
transferBtn.addEventListener('click', function () {
  const senderAccountNumber = document.getElementById('senderAccountNumber').value;
  const receiverAccountNumber = document.getElementById('receiverAccountNumber').value;
  const amount = parseFloat(document.getElementById('transferAmount').value);

  bank.transfer(senderAccountNumber, receiverAccountNumber, amount);
});