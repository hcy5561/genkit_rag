![image](https://github.com/user-attachments/assets/7e8f794f-afed-4b83-9428-c9d04a417412)

# Google Samsun Developer Group DevFest 2024

DevFest 2024 has arrived, and the focus on Responsible AI is more relevant than ever. Join us in examining the critical role of developing technologies that enhance productivity while minimizing harm. Let’s work together to create a future where AI responsibly benefits humanity. Locate a DevFest near you and get ready for an incredible experience.

DevFest events are large-scale, community-focused technology gatherings organized by Google Developer Groups (GDG) aimed at developers. These events take place in various cities around the world and provide developers with the opportunity to learn about, apply, and network with others in the field regarding the latest technologies.

DevFest events bring together local and global technology communities. Participants have the chance to meet other developers with similar interests, share experiences, and collaborate. These events serve as an excellent platform for developers to discover new opportunities for their careers.

DevFest offers a wide range of activities, including technical talks, hands-on workshops, panel discussions, and networking sessions. Topics covered at the events include artificial intelligence, machine learning, cloud computing, data science, and web technologies.

DevFest events have a significant impact among technology communities worldwide. Each year, thousands of participants come together at DevFest events to discuss the latest developments in the tech world and to innovate. These gatherings provide platforms for showcasing Google’s newest products and technologies, enabling attendees to shape the future of technology.

## **Firebase Genkit**

Firebase GenKit is a comprehensive toolset by Firebase designed to accelerate the development of AI and machine learning applications. It seamlessly integrates Firebase services like Authentication, Firestore, and Cloud Functions, enabling rapid deployment of user authentication, data management, and workflow automation. This toolkit allows developers to create custom functional modules that optimize app performance and integrate smoothly with cloud infrastructure. As a result, applications become more secure, efficient, and scalable, helping developers save time and focus on advanced features.

### **Run Firebase Genkit with RAG using idx:**

1-Click following button and import.

<a href="https://idx.google.com/import?url=https://github.com/hcy5561/genkit_rag.git">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.idx.dev/btn/open_dark_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.idx.dev/btn/open_light_32.svg">
    <img
      height="32"
      alt="Open in IDX"
      src="https://cdn.idx.dev/btn/open_purple_32.svg">
  </picture>
</a>

2-Go .idx file in idx left menu. Open dev.nix and enter your google api key. Rebuild Environment:

![image](https://github.com/user-attachments/assets/7b4a592e-52b9-4cbd-89ac-ad5ec613fd3e)

3-Open new terminal from main menu.

(Option) Split to run all terminals simultaneously and create terminal panels:

![image](https://github.com/user-attachments/assets/c354fc16-a161-4e9d-a53d-c67a32339e19)

4-Run below commands in terminal, respectively or seperately:
  
  genkit-basic next.js web app (working port: 3000):
  
    cd genkit-basic
    npm install
    npm install -g genkit @genkit-ai/tools-common
    npm run dev
    
  genkit-basic genkit app (working port: 5000):
    
    cd genkit-basic
    npm install    
    npm install -g genkit @genkit-ai/tools-common
    genkit start --port 5000
    
  genkit-rag next.js RAG web app (working port: 3001):
  
    cd genkit-rag
    npm install
    npm install -g genkit @genkit-ai/tools-common
    npm run dev --port 3001
    
  genkit-rag genkit RAG app (working port: 5001):
    
    cd genkit-rag
    npm install    
    npm install -g genkit @genkit-ai/tools-common
    genkit start --port 5001

### **Run Firebase Genkit with RAG web app in your local computer:**

1-Firstly, download and install NPM (https://nodejs.org/en/download/package-manager), if you don't have NPM.

2-Install git.

3-For windows users, Run CMD and Follow below commands:
    git clone https://github.com/hcy5561/genkit_rag.git
    cd genkit_rag/genkit-rag
    npm install
    npm install -g genkit @genkit-ai/tools-common
    set GOOGLE_API_KEY=<your-api-key>
    npm run dev
    



