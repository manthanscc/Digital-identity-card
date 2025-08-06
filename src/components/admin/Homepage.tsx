import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg px-10 py-8 text-center flex flex-col items-center justify-center">
        <div>
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-white mb-4">
          Hello, Welcome!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          This is your homepage. More features coming soon!
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Check the admin panel for more options.
        </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;