import { useState } from 'react';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, officerLogin, borrowerLogin, officerDashboard, borrowerDashboard
  const [loggedInUser, setLoggedInUser] = useState(null); // {role: 'officer' or 'borrower', name: '...', email: '...' }
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [modal, setModal] = useState(null);

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(''), 3000);
  };

  const [loans, setLoans] = useState ([
    { id: 1, borrowerName: "Rajesh Kumar", amount: 850000, dueDate: "2025-01-10", riskScore: 88, daysOverdue: 5},
    { id: 2, borrowerName: "Priya Sharma", amount: 1200000, dueDate: "2024-12-28", riskScore: 72, daysOverdue: 0},
    { id: 3, borrowerName: "Amit Patel", amount: 500000, dueDate: "2025-02-15", riskScore: 23, daysOverdue: 0},
    { id: 4, borrowerName: "Sunita Devi", amount: 2000000, dueDate: "2025-01-05", riskScore: 94, daysOverdue: 12},
    { id: 5, borrowerName: "Vikram Singh", amount: 650000, dueDate: "2025-01-20", riskScore: 55, daysOverdue: 0},
  ]);

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentView('home');
    setProfileMenuOpen(false);
  };

  const Header = () => (
    <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f2b57', color: 'white' }}>
      <h1 style={{ fontSize: '2rem' }}>LoanTrackPro</h1>
      <div style={{ position: 'relative' }}>
        <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#of2b57', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {loggedInUser?.name.charAt(0).toUpperCase()}
          </div>
        </button>
        {profileMenuOpen && (
          <div style={{ position: 'absolute', right: 0, top: '60px', background: '#333', color: 'white', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', zIndex: 1000, width: '200px' }}>
            <button onClick={() => {
              setAlert('Password change coming soon!');
              setTimeout(() => setAlert(''), 3000);
              setProfileMenuOpen(false);
            }} style={{ width: '100%', padding: '15px', background: 'none', border: 'none', color: 'white', textAlign: 'left', paddingLeft: '20px' }}>
              Change Password
            </button>
            <hr style={{ margin: '0', border: '0.5px solid #555' }} />
            <button onClick={handleLogout} style={{ width: '100%', padding: '15px', background: 'none', border: 'none', color: 'white', textAlign: 'left', paddingLeft: '20px' }}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );

  //Home Page - bright and attractive
  if (currentView === 'home') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #0f2b57, #1e4d92)', minHeight: '100vh' }}>
        <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold' }}>LoanTrackPro</h1>
          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '2.5rem', cursor: 'pointer' }}>
            ≡
          </button>
        </header>

        <div style={{ textAlign: 'center', marginTop: '150px', color: 'white', textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
          <h1 style={{ fontSize: '4rem, ', fontWeight: 'bold', marginBottom: '20px' }}>Welcome</h1>
          <p style={{ fontSize: '2rem', marginBottom: '20px' }}>AI-Powered Loan Monitoring Platform</p>
          <p style={{ fontSize: '1.4rem' }}>Tap the menu to login</p>
        </div>

        {menuOpen && (
          <div style={{ position: 'fixed', top: 0, left:0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000 }} onClick={() => setMenuOpen(false)}>
            <div style={{ background: 'white', width: '300px', height: '100%', padding: '40px 20px', boxShadow: '10px 0 30px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}>x</button>
              <h2 style={{ color: '#0f2b57', marginBottom: '50px', textAlign: 'center' }}>Login As</h2>
              <button onClick={() => {setCurrentView('officerLogin'); setMenuOpen(false); }} style={{ width: '100%', padding: '18px', marginBottom: '20px', background: '#0f2b57', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem' }}>
                Bank Officer
              </button>
              <button onClick={() => { setCurrentView('borrowerLogin'); setMenuOpen(false); }} style={{ width: '100%', padding: '18px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem' }}>
                Borrower
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  //Officer Login - any credentials work
  if (currentView === 'officerLogin') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #0f2b57, #1e4d92)', minHeight:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="card" style={{ padding: '50px', width: '400px', textAlign: 'center' }}>
          <h1 style={{ color: '#0f2b57', marginBottom: '30px' }}>Bank Officer Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoggedInUser({ role: 'officer', name: 'Bank Officer' });
            setCurrentView('officerDashboard');
          }}>
            <input type="email" placeholder="Email" required style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
            <input type="password" placeholder="Password" required style={{ width: '100%', padding: '15px', marginBottom: '30px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
            <button type="submit" style={{ width: '100%', padding: '18px', background: '#0f2b57', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem' }}>
              Login
            </button>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center'}}>
            <button onClick={() => setCurrentView('home')} style={{ background: 'none', border:'none', color: '#aaa', fontSize: '1rem', cursor: 'pointer', textDecoration:'underline'}}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Borrower Login - any credentials work (demo mode)
  if (currentView === 'borrowerLogin') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #0f2b57, #1e4d92)', minHeight:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ padding: '50px', width: '400px', textAlign: 'center' }}>
          <h1 style={{ color: '#0f2b57', marginBottom: '30px' }}>Borrower Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            setLoggedInUser({ role: 'borrower', name: 'Borrower', loan: loans[0] }); //use first loan as example
            setCurrentView('borrowerDashboard');
          }}>
            <input type="email" placeholder="Email" required style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
            <input type="password" placeholder="Password" required style={{ width: '100%', padding: '15px', marginBottom: '30px', borderRadius: '10px', border: '1px sold #ccc', fontSize: '1.1rem' }} />
            <button type="submit" style={{ width: '100%', padding: '18px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem' }}>
              Login
            </button>
            <div style={{ marginTop: '20px', textAlign: 'center'}}>
              <button onClick={() => setCurrentView('home')} style={{ background: 'none', border:'none', color: '#aaa', fontSize: '1rem', cursor: 'pointer', textDecoration:'underline'}}>
                ← Back to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Officer Dashboard
  if (currentView === 'officerDashboard') {
    const highRiskCount = loans.filter(l => l.riskScore > 80).length;
    const mediumRiskCount = loans.filter(l => l.riskScore > 60 && l.riskScore <= 80).length;
    const totalPortfolio = loans.reduce((sum, loan) => sum + loan.amount, 0);

    const markResolved = (id, name) => {
      if (window.confirm(`Mark loan for ${name} as resolved? This will remove it from the list. `)) {
        setLoans(loans.filter(l => l.id !== id));
        showAlert(`Loan for ${name} marked as resolved and removed!`);
      }
    };

    const viewDetails = (loan) => {
      setModal({ ...loan, action: 'details' });
    };

    const callFollowUp = (loan) => {
      setModal({ ...loan, action: 'call' });
    };

    return (
      <div style={{ background: 'linear-gradient(135deg, #0f2b57, #1e4d92)', minHeight: '100vh' }}>
        <Header />

        {alert && (
          <div style={{
            position: 'fixed',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#27ae60',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '50px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}>
            ✅ {alert}
          </div>
        )}

        {modal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setModal(null)}>
            <div className="card" style={{
              padding: '40px',
              maxWidth: '500px',
              position: 'relative',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setModal(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '25px',
                  fontSize: '2rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                x
              </button>

              <h2 style={{ color: '#0f2b57', marginBottom: '20px', textAlign: 'center' }}>
                {modal.action === 'call' ? 'Call & Follow Up' : 'Full Customer Profile'}
              </h2>

              <h3 style={{ color: '#0f2b57', fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>
                {modal.borrowerName}
              </h3>

              {modal.action === 'call'? (
                <div style={{ lineHeight: '2' }}>
                  <p><strong>Phone:</strong> +91-98765-43210</p>
                  <p><strong>Email:</strong> {modal.borrowerName.toLowerCase ().replace('', '.')}@gmail.com</p>
                  <hr style={{ margin: '25px 0' }} />
                  <p><strong>Message:</strong></p>
                  <p style={{ background: '#f0f0f0', padding: '15px', borderRadius: '10px', fontStyle: 'italic' }}>
                    "Hello {modal.borrowerName}, this from the bank. Your loan payment is due on {modal.dueDate}. Please make the payment to avoid additional charges. Thank you."
                  </p>
                </div>
              ) : (
                <div style={{ lineHeight: '2' }}>
                  <p><strong>Loan Amount:</strong> ₹{modal.amount.toLocaleString('en-IN')}</p>
                  <p><strong>Due Date:</strong> {modal.dueDate}</p>
                  <p><strong>Days Overdue:</strong>
                    {modal.daysOverdue > 0
                      ? <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{modal.daysOverdue} days</span>
                      : 'On track'}
                  </p>
                  <p><strong>Risk Score:</strong>
                    <span style={{
                      fontSize: '2.2rem',
                      fontWeight: 'bold',
                      color: modal.riskScore > 80 ? '#e74c3c' : modal.riskScore > 60 ? '#f39c12' : '#27ae60'
                    }}>
                      {modal.riskScore}/100
                    </span>
                  </p>
                  <hr style={{ margin: '25px 0' }} />
                  <p><strong>Phone:</strong> +91-98765-43210</p>
                  <p><strong>Email:</strong> {modal.borrowerName.toLowerCase().replace('', '.')}@gmail.com</p>
                  <p><strong>Address:</strong> Mumbai, Maharashtra</p>
                  <p><strong>Occupation:</strong> Software Engineer</p>
                  <p><strong>Annual Income:</strong> ₹18 Lakhs</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="container" style={{ padding: '30px' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>
            Bank Officer Dashboard
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '50px' }}>
            <div className="card"><h2>₹{(totalPortfolio / 100000).toFixed(1)} Cr</h2><p>Total Active Portfolio</p></div>
            <div className="card risk-high"><h2>{highRiskCount}</h2><p>High Risk Loans</p></div>
            <div className="card risk-medium"><h2>{mediumRiskCount}</h2><p>Medium Risk</p></div>
            <div className="card risk-low"><h2>{loans.length}</h2><p>Loans Monitored</p></div>
          </div>

          <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '30px', textAlign: 'center' }}>
            Loans Requiring Immediate Attention
          </h2>

          <div style={{ display: 'grid', gap: '25px' }}>
            {loans.map(loan => (
              <div key={loan.id} className={`card ${loan.riskScore > 80 ? 'risk-high' : loan.riskScore > 60 ? 'risk-medium' : 'risk-low'}`}>
                <h3>{loan.borrowerName}</h3>
                <p><strong>Amount:</strong> ₹{loan.amount.toLocaleString('en-IN')}</p>
                <p><strong>Due:</strong> {loan.dueDate} {loan.daysOverdue > 0 && <span style={{ color: '#e74c3c' }}>(Overdue {loan.daysOverdue} days)</span>}</p>
                <p><strong>Risk Score:</strong>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: loan.riskScore > 80 ? '#e74c3c' : loan.riskScore > 60 ? '#f39c12' : '#27ae60' }}>
                    {loan.riskScore}/100
                  </span>
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn btn-success" onClick={() => showAlert(`Reminder sent to ${loan.borrowerName}!`)}>
                    Send Automated Reminder
                  </button>
                  <button className="btn" style={{ background: '#3498db' }} onClick={() => markResolved(loan.id, loan.borrowerName)}>
                    Mark as Resolved
                  </button>
                  <button className="btn" style={{ background: '#9b59b6' }} onClick={() => viewDetails(loan)}>
                    View Full Details
                  </button>
                  <button className="btn" style={{ background: '#27ae60' }} onClick={() => callFollowUp(loan)}>
                    Call & Follow Up
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Borrower Dashboard
  if (currentView === 'borrowerDashboard') {
    const loan = loggedInUser.loan;

    return (
      <div style={{ background: 'linear-gradient(135deg, #0f2b57, #1e4d92)', minHeight: '100vh' }}>
        <Header />

        {alert && (
          <div style={{
            position: 'fixed',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#27ae60',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '50px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}>
            ✅ {alert}
          </div>
        )}

        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px', textShadow: '3px 3px 8px rgba(0,0,0,0.8)' }}>
            Welcome, {loggedInUser.name}
          </h1>
          <p style={{ color: 'white', fontSize:'1.5rem', marginBottom: '40px', textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
            Your Loan Status
          </p>

          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
            <h2 style={{ color: '#0f2b57', marginBottom: '30px' }}>Your Loan Details</h2>
            <p><strong>Amount:</strong> ₹{loan.amount.toLocaleString('en-IN')}</p>
            <p><strong>Due Date:</strong> {loan.dueDate}</p>
            <p><strong>Days Overdue:</strong>
              {loan.daysOverdue > 0
                ? <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{loan.daysOverdue} days</span>
                : <span style={{ color: '#27ae60', fontWeight: 'bold' }}>On track</span>}
            </p>
            <p><strong>Risk Score:</strong>
              <span style={{ fontSize: '3rem', fontWeight: 'bold', color: loan.riskScore > 80 ? '#e74c3c' : loan.riskScore > 60 ? '#f39c12' : '#27ae60' }}>
                {loan.riskScore}/100
              </span>
            </p>
            <button onClick={() => {
              setAlert('Contact support at support@loantrackpro.com or call +91-98765-43210');
              setTimeout(() => setAlert(''), 3000);
            }} style={{ marginTop: '30px', padding: '18px 40px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2rem' }}>
              Contact Bank for Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;