import './App.css'
import { AppRouter } from './router';
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
   const { isAuthenticated, isLoading } = useAuth();

   useEffect(() => {
      const fetchRepos = async () => {
         try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;
            const res = await fetch(`${API_BASE_URL}/api/auth/github/repos`, {
               headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
               credentials: 'include',
            });
            if (!res.ok) return;
            const repos = await res.json();
            // eslint-disable-next-line no-console
            console.log('GitHub repos (fetched):', repos);
         } catch (e) {
            // ignore
         }
      };

      if (!isLoading && isAuthenticated) {
         fetchRepos();
      }
   }, [isAuthenticated, isLoading]);

   return <AppRouter />;
}

export default App
