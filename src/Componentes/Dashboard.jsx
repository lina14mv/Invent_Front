import React from 'react';

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Card 1</h2>
          <p className="mt-2">Content for card 1.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Card 2</h2>
          <p className="mt-2">Content for card 2.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Card 3</h2>
          <p className="mt-2">Content for card 3.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;