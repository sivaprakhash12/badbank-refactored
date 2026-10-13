const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Data Store (Refactored architecture mock / store)
let accounts = [
  {
    id: 1,
    name: 'Sivaprakhash',
    email: 'sivaprakhash7@gmail.com',
    password: 'password123',
    balance: 5000,
    history: [
      { type: 'Account Created', amount: 5000, date: new Date().toLocaleString(), balance: 5000 }
    ]
  },
  {
    id: 2,
    name: 'Peter Parker',
    email: 'peter@mit.edu',
    password: 'secretPassword',
    balance: 1500,
    history: [
      { type: 'Account Created', amount: 1500, date: new Date().toLocaleString(), balance: 1500 }
    ]
  }
];

// 1. Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BadBank API Server is running smoothly.' });
});

// Helper for create account
function handleCreate(req, res) {
  const { name, email, password } = req.params;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
  }

  const existing = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const maxId = accounts.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0);
  const newAccount = {
    id: maxId + 1,
    name,
    email,
    password,
    balance: 100, // Initial welcome bonus
    history: [
      { type: 'Account Created', amount: 100, date: new Date().toLocaleString(), balance: 100 }
    ]
  };

  accounts.push(newAccount);
  res.status(201).json({
    message: 'Account created successfully!',
    user: { name: newAccount.name, email: newAccount.email, balance: newAccount.balance }
  });
}

// 2. Create Account
app.post('/account/create/:name/:email/:password', handleCreate);
app.get('/account/create/:name/:email/:password', handleCreate);

// Helper for login
function handleLogin(req, res) {
  const { email, password } = req.params;
  const user = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({
    message: 'Login successful!',
    user: { name: user.name, email: user.email, balance: user.balance }
  });
}

// 3. Login
app.post('/account/login/:email/:password', handleLogin);
app.get('/account/login/:email/:password', handleLogin);

// 4. Get Balance
app.get('/account/balance/:email', (req, res) => {
  const user = accounts.find(a => a.email.toLowerCase() === req.params.email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Account not found.' });
  }
  res.json({ email: user.email, name: user.name, balance: user.balance });
});

// Helper for deposit
function handleDeposit(req, res) {
  const { email, amount } = req.params;
  const numAmount = Number(amount);

  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Please enter a valid positive numeric amount.' });
  }

  const user = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Account not found.' });
  }

  user.balance += numAmount;
  user.history.push({
    type: 'Deposit',
    amount: numAmount,
    date: new Date().toLocaleString(),
    balance: user.balance
  });

  res.json({
    message: `Successfully deposited $${numAmount.toFixed(2)}`,
    newBalance: user.balance
  });
}

// 5. Deposit
app.post('/account/deposit/:email/:amount', handleDeposit);
app.get('/account/deposit/:email/:amount', handleDeposit);

// Helper for withdraw
function handleWithdraw(req, res) {
  const { email, amount } = req.params;
  const numAmount = Number(amount);

  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Please enter a valid positive numeric amount.' });
  }

  const user = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Account not found.' });
  }

  if (numAmount > user.balance) {
    return res.status(400).json({
      error: `Transaction failed: Overdraft alert! Requested amount ($${numAmount}) exceeds available balance ($${user.balance}).`
    });
  }

  user.balance -= numAmount;
  user.history.push({
    type: 'Withdrawal',
    amount: numAmount,
    date: new Date().toLocaleString(),
    balance: user.balance
  });

  res.json({
    message: `Successfully withdrew $${numAmount.toFixed(2)}`,
    newBalance: user.balance
  });
}

// 6. Withdraw
app.post('/account/withdraw/:email/:amount', handleWithdraw);
app.get('/account/withdraw/:email/:amount', handleWithdraw);

// 7. Get account by ID
app.get('/account/id/:id', (req, res) => {
  const reqId = Number(req.params.id);
  const user = accounts.find(a => Number(a.id) === reqId);
  if (!user) {
    return res.status(404).json({ error: `Account with ID ${req.params.id} not found.` });
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    balance: user.balance,
    history: user.history || []
  });
});

// 8. All Data (Audit ledger) - Returns all accounts with ID
app.get('/account/all', (req, res) => {
  const safeAccounts = accounts.map((a, idx) => ({
    id: a.id !== undefined ? a.id : idx + 1,
    name: a.name || 'Unnamed Account',
    email: a.email || 'N/A',
    balance: typeof a.balance === 'number' ? a.balance : Number(a.balance) || 0,
    transactionsCount: (a.history && Array.isArray(a.history)) ? a.history.length : 1,
    history: a.history || [
      { type: 'Account Initialized', amount: a.balance || 0, date: new Date().toLocaleString(), balance: a.balance || 0 }
    ]
  }));
  res.json(safeAccounts);
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 BadBank Server running at http://localhost:${PORT}`);
  console.log(`📱 Open your browser to test the interactive Banking App!`);
  console.log(`======================================================\n`);
});
