'use client';

import { callMenuSuggestionFlow } from '@/app/genkit';
import { useState, useEffect } from 'react';

export default function Home() {
  const [menuItem, setMenu] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(userPrefersDark ? 'dark' : 'light');
  }, []);

  async function getMenuItem(formData: FormData) {
    const theme = formData.get('theme')?.toString() ?? '';
    const suggestion = await callMenuSuggestionFlow(theme);
    setMenu(suggestion);
  }
  
  const currentStyles = theme === 'dark' ? styles.dark : styles.light;

  return (
    <main style={currentStyles.main}>
      <div style={currentStyles.container}>
        <h1 style={currentStyles.heading}>Developer Şef</h1>
        <form onSubmit={(e) => { e.preventDefault(); getMenuItem(new FormData(e.currentTarget)); }} style={currentStyles.form}>
          <label style={currentStyles.label}>
            Yapmak istediğiniz yemeğin adını yazın:
            </label>
            <input type="text" name="theme" placeholder="Örneğin: Kuru Fasulye" style={currentStyles.input} />
         
          <button type="submit" style={currentStyles.button}>Generate</button>
        </form>
        {menuItem && (
          <pre style={currentStyles.pre}>{menuItem}</pre>
        )}
      </div>
    </main>
  );
}

const styles = {
  light: {
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px',
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '500px',
      width: '100%',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '16px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    pre: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      whiteSpace: 'pre-wrap',
      marginTop: '20px',
    },
  },
  dark: {
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      padding: '20px',
    },
    container: {
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      maxWidth: '500px',
      width: '100%',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#ffffff',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '16px',
      marginBottom: '5px',
      color: '#ffffff',
    },
    input: {
      padding: '10px',
      border: '1px solid #555',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '16px',
      backgroundColor: '#333',
      color: '#ffffff',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    pre: {
      backgroundColor: '#333',
      padding: '15px',
      borderRadius: '4px',
      whiteSpace: 'pre-wrap',
      marginTop: '20px',
      color: '#ffffff',
    },
  },
};
