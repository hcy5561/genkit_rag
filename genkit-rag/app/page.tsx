'use client';

import { useState, useRef, FormEvent } from 'react';
import { callRAGSoruCevap, callIndexFlow } from '@/app/genkit';

export default function ChatBot() {
  const [inputText, setInputText] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfContent = e.target?.result as string;
        await callIndexFlow(pdfContent.split(',')[1]);
      };
      reader.readAsDataURL(file);
      setPdfFile(file);
    }
  }

  async function handleUserInput(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputText.trim()) {
      const userMessage = inputText;
      const previousConversation = chatHistory
        .map(chat => `Kullanıcı: ${chat.user}\nBot: ${chat.bot}`)
        .join('\n');

      setChatHistory((prev) => [...prev, { user: userMessage, bot: 'Yanıt Bekleniyor...' }]);
      setInputText('');

      try {
        const botResponse = await callRAGSoruCevap(`${previousConversation}\nKullanıcı: ${userMessage}`);
        setChatHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].bot = botResponse;
          return newHistory;
        });

        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
      } catch (error) {
        console.error('Error getting bot response:', error);
      }
    }
  }

  return (
    <main style={styles.mainContainer}>
      <section style={styles.chatContainer} ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={styles.messageContainer}>
            <div style={styles.userMessage}>
              <span style={styles.userLabel}>Kullanıcı:</span> {chat.user}
            </div>
            <div style={styles.botMessage}>
              <span style={styles.botLabel}>Bot:</span>
              <div style={styles.botResponse}>{chat.bot}</div>
            </div>
          </div>
        ))}
      </section>

      <form onSubmit={handleUserInput} style={styles.form}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Sorunuzu buraya yazın..."
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Gönder</button>
      </form>

      <div style={styles.fileUploadContainer}>
        <label htmlFor="pdfUpload" style={styles.uploadLabel}>Bir PDF dosyası yükleyin:</label>
        <input type="file" id="pdfUpload" onChange={handleFileUpload} style={styles.fileInput} />
      </div>
    </main>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    height: '60vh',
    overflowY: 'auto' as const,
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  messageContainer: {
    marginBottom: '15px',
  },
  userMessage: {
    backgroundColor: '#e0f7fa',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '5px',
    textAlign: 'left' as const,
  },
  botMessage: {
    backgroundColor: '#ffecb3',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'left' as const,
  },
  botResponse: {
    display: 'block',
    whiteSpace: 'pre-line' as const, // Cevapların alt alta yazılmasını sağlıyor
  },
  userLabel: {
    fontWeight: 'bold' as const,
    color: '#00796b',
  },
  botLabel: {
    fontWeight: 'bold' as const,
    color: '#f57c00',
  },
  form: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '5px 0 0 5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#00796b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
  },
  fileUploadContainer: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginTop: '20px',
  },
  uploadLabel: {
    marginBottom: '10px',
  },
  fileInput: {
    cursor: 'pointer',
  },
};
