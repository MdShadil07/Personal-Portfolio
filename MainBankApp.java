
import java.util.*;

class BankAccount {
    private String accountHolder;
    private String accountNumber;
    private double balance;

    public BankAccount(String accountHolder, String accountNumber, double openingBalance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = openingBalance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be positive.");
            return;
        }
        balance += amount;
        System.out.println("Deposited ₹" + amount);
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println(" Amount must be positive.");
            return;
        }
        if (amount > balance) {
            System.out.println("Insufficient balance.");
            return;
        }
        balance -= amount;
        System.out.println("Withdrawn ₹" + amount);
    }

    public void transfer(BankAccount receiver, double amount) {
        if (amount <= 0) {
            System.out.println(" Amount must be positive.");
            return;
        }
        if (amount > balance) {
            System.out.println(" Insufficient balance for transfer.");
            return;
        }
        balance -= amount;
        receiver.balance += amount;

        System.out.println("Successfully transferred ₹" + amount + " to " + receiver.getAccountHolder());
    }

    public void displayDetails() {
        System.out.println("\n--- Account Details ---");
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Balance: ₹" + balance);
        System.out.println("-------------------------");
    }
}

class Bank {
    private Map<String, BankAccount> accounts = new HashMap<>();
    private Scanner sc = new Scanner(System.in);

    public void startMenu() {
        while (true) {
            System.out.println("\n====== BANKING SYSTEM MENU ======");
            System.out.println("1. Open New Account");
            System.out.println("2. Deposit Money");
            System.out.println("3. Withdraw Money");
            System.out.println("4. Check Balance");
            System.out.println("5. Transfer Money");
            System.out.println("6. View Account Details");
            System.out.println("7. List All Accounts");
            System.out.println("8. Exit");
            System.out.print("Choose an option: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> openAccount();
                case 2 -> depositMoney();
                case 3 -> withdrawMoney();
                case 4 -> checkBalance();
                case 5 -> transferMoney();
                case 6 -> viewDetails();
                case 7 -> listAllAccounts();
                case 8 -> {
                    System.out.println("Exiting... Thank you for banking with us!");
                    return;
                }
                default -> System.out.println("Invalid option! Try again.");
            }
        }
    }

    private void openAccount() {
        System.out.print("Enter Account Holder Name: ");
        String name = sc.nextLine();

        String accNo = "ACC" + (accounts.size() + 1); 
        System.out.print("Enter Opening Balance: ");
        double openingBalance = sc.nextDouble();

        BankAccount account = new BankAccount(name, accNo, openingBalance);
        accounts.put(accNo, account);

        System.out.println("✔ Account Created Successfully!");
        System.out.println("Your Account Number: " + accNo);
    }

    private void depositMoney() {
        BankAccount account = findAccount();
        if (account == null)
            return;

        System.out.print("Enter amount to deposit: ");
        double amount = sc.nextDouble();
        account.deposit(amount);
    }

    private void withdrawMoney() {
        BankAccount account = findAccount();
        if (account == null)
            return;

        System.out.print("Enter amount to withdraw: ");
        double amount = sc.nextDouble();
        account.withdraw(amount);
    }

    private void checkBalance() {
        BankAccount account = findAccount();
        if (account == null)
            return;

        System.out.println("Current Balance: ₹" + account.getBalance());
    }

    private void transferMoney() {
        System.out.print("Enter Your Account Number: ");
        BankAccount sender = findAccountByNumber(sc.nextLine());
        if (sender == null)
            return;

        System.out.print("Enter Receiver Account Number: ");
        BankAccount receiver = findAccountByNumber(sc.nextLine());
        if (receiver == null)
            return;

        System.out.print("Enter amount to transfer: ");
        double amount = sc.nextDouble();
        sender.transfer(receiver, amount);
    }

    private void viewDetails() {
        BankAccount account = findAccount();
        if (account != null)
            account.displayDetails();
    }

    private void listAllAccounts() {
        System.out.println("\n---- ALL ACCOUNTS ----");
        for (BankAccount account : accounts.values()) {
            account.displayDetails();
        }
    }

    private BankAccount findAccount() {
        System.out.print("Enter Account Number: ");
        String accNo = sc.nextLine();
        BankAccount account = accounts.get(accNo);

        if (account == null) {
            System.out.println("❌ Account not found!");
        }
        return account;
    }

    private BankAccount findAccountByNumber(String accNo) {
        BankAccount account = accounts.get(accNo);
        if (account == null)
            System.out.println("❌ Account not found!");
        return account;
    }
}

public class MainBankApp {
    public static void main(String[] args) {
        Bank bank = new Bank();
        bank.startMenu();
    }
}
