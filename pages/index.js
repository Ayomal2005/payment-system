import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Eye, Calendar, User, Phone, CreditCard, Hash, LogOut, Shield } from 'lucide-react';

const PaymentManagementSystem = () => {
  // State management
  const [payments, setPayments] = useState([]);
  const [currentView, setCurrentView] = useState('client'); // 'client', 'admin-login', 'admin-panel'
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: '',
    whatsapp: '',
    amount: '',
    receipt: ''
  });

  // Sample data for demo
  useEffect(() => {
    const samplePayments = [
      {
        id: 1,
        name: 'කමල් පෙරේරා',
        whatsapp: '077-1234567',
        amount: '5000',
        receipt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        status: 'pending',
        submittedAt: new Date('2024-12-15').toISOString()
      },
      {
        id: 2,
        name: 'සුනිල් සිල්වා',
        whatsapp: '071-9876543',
        amount: '3500',
        receipt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        status: 'approved',
        submittedAt: new Date('2024-12-14').toISOString()
      }
    ];
    setPayments(samplePayments);
  }, []);

  // Admin login
  const handleAdminLogin = () => {
    if (adminCredentials.username === 'Ayomal Gimrash' && adminCredentials.password === 'Menaka@2005') {
      setCurrentView('admin-panel');
      setAdminCredentials({ username: '', password: '' });
    } else {
      alert('වැරදි username හෝ password එකක්!');
    }
  };

  // Add new payment
  const handleAddPayment = () => {
    if (!newPayment.name || !newPayment.whatsapp || !newPayment.amount || !newPayment.receipt) {
      alert('කරුණාකර සියලුම fields පුරවන්න');
      return;
    }

    const payment = {
      id: Date.now(),
      ...newPayment,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setPayments([payment, ...payments]);
    setNewPayment({ name: '', whatsapp: '', amount: '', receipt: '' });
    setShowAddPayment(false);
    alert('ඔබේ payment details යවා ඇත. Admin approval එක හරහා ගිහින් WhatsApp එකට message එකක් එනවා.');
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPayment({ ...newPayment, receipt: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Admin actions
  const handleStatusChange = (id, status) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status } : payment
    ));
    
    const payment = payments.find(p => p.id === id);
    if (status === 'approved') {
      alert(`✅ ${payment.name} ගේ payment එක approve කරන ලදී. WhatsApp message එකක් යවන්න: ${payment.whatsapp}`);
    } else {
      alert(`❌ ${payment.name} ගේ payment එක decline කරන ලදී. WhatsApp message එකක් යවන්න: ${payment.whatsapp}`);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('si-LK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Admin Login Page
  const AdminLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-600 mt-2">System එකට access කරන්න</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={adminCredentials.username}
                onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Admin username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>

            <button
              onClick={handleAdminLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login කරන්න
            </button>

            <div className="text-center">
              <button
                onClick={() => setCurrentView('client')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Client page එකට යන්න
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo Credentials:</strong><br />
             ....: ....<br />
             ....:....
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Client Page
  const ClientPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Management System</h1>
          <p className="text-gray-600">සරල payment management system එකක්</p>
          
          {/* Admin Access Button */}
          <div className="mt-6">
            <button
              onClick={() => setCurrentView('admin-login')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
            >
              <Shield size={16} />
              Admin Access
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Public Payment Submission */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details Submit කරන්න</h2>
            
            {!showAddPayment ? (
              <div className="text-center">
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={20} />
                  Payment Add කරන්න
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    නම
                  </label>
                  <input
                    type="text"
                    value={newPayment.name}
                    onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ඔබේ සම්පූර්ණ නම"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={newPayment.whatsapp}
                    onChange={(e) => setNewPayment({ ...newPayment, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="077-1234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard size={16} className="inline mr-2" />
                    Payment Amount (LKR)
                  </label>
                  <input
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Receipt (Screenshot)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newPayment.receipt && (
                    <div className="mt-2">
                      <img
                        src={newPayment.receipt}
                        alt="Receipt preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddPayment}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit කරන්න
                  </button>
                  <button
                    onClick={() => {
                      setShowAddPayment(false);
                      setNewPayment({ name: '', whatsapp: '', amount: '', receipt: '' });
                    }}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel කරන්න
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Panel Page
  const AdminPanelPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Admin Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-600">Welcome back, <span className="font-medium">Admin</span></p>
              </div>
              <button
                onClick={() => setCurrentView('client')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800">Pending Payments</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Approved Payments</h3>
                <p className="text-2xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'approved').length}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800">Declined Payments</h3>
                <p className="text-2xl font-bold text-red-600">
                  {payments.filter(p => p.status === 'declined').length}
                </p>
              </div>
            </div>

            {/* Payment List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment Management</h3>
              {payments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">කිසිම payment එකක් නෑ</p>
              ) : (
                payments.map(payment => (
                  <div key={payment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                      <div className="lg:col-span-2">
                        <h3 className="font-semibold text-lg">{payment.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Phone size={14} />
                          {payment.whatsapp}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(payment.submittedAt)}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">LKR {Number(payment.amount).toLocaleString()}</p>
                      </div>
                      
                      <div className="text-center">
                        {payment.receipt && (
                          <img
                            src={payment.receipt}
                            alt="Receipt"
                            className="w-16 h-16 object-cover rounded-lg border mx-auto cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => window.open(payment.receipt, '_blank')}
                          />
                        )}
                      </div>
                      
                      <div className="text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status === 'pending' ? 'Pending' :
                           payment.status === 'approved' ? 'Approved' : 'Declined'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 justify-center">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(payment.id, 'approved')}
                              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(payment.id, 'declined')}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Decline"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        <a
                          href={`https://wa.me/${payment.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="WhatsApp එකට message කරන්න"
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render based on current view
  return (
    <>
      {currentView === 'client' && <ClientPage />}
      {currentView === 'admin-login' && <AdminLoginPage />}
      {currentView === 'admin-panel' && <AdminPanelPage />}
    </>
  );
};

export default PaymentManagementSystem;
