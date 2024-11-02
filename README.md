**Run Firebase Genkit with RAG using idx:**

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

2-Go .idx file in idx left menu. Open dev.nix and enter your google api key. Again build repository:

![image](https://github.com/user-attachments/assets/7b4a592e-52b9-4cbd-89ac-ad5ec613fd3e)

3-Open new terminal from main menu.

(Option) Split to run all terminals simultaneously and create terminal panels:

![image](https://github.com/user-attachments/assets/c354fc16-a161-4e9d-a53d-c67a32339e19)

![image](https://github.com/user-attachments/assets/9eebe7ee-1021-49e8-8492-073a5fd99e69)

4-Run below commands in terminal, respectively:
  
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
    
  genkit-rag next.js RAG web app (working port: 3000):
  
    cd genkit-rag
    npm install
    npm install -g genkit @genkit-ai/tools-common
    npm run dev
    
  genkit-rag genkit RAG app (working port: 5000):
    
    cd genkit-basic
    npm install    
    npm install -g genkit @genkit-ai/tools-common
    genkit start --port 5000





