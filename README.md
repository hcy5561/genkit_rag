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

2-Open new terminal from main menu.

3-Split to run all terminals simultaneously:

![image](https://github.com/user-attachments/assets/c354fc16-a161-4e9d-a53d-c67a32339e19)

4-Create for terminal panel:

![image](https://github.com/user-attachments/assets/9eebe7ee-1021-49e8-8492-073a5fd99e69)

5-Go .idx file in idx left menu. Open dev.nix and enter your google api key:

![image](https://github.com/user-attachments/assets/7b4a592e-52b9-4cbd-89ac-ad5ec613fd3e)

6-Run below commands for all terminals, respectively:
  
  Terminal 1 (working port: 3000):

    npm install
    cd genkit-basic
    npm install -g genkit @genkit-ai/tools-common
    npm run dev
    
  Terminal 2 (working port: 5000):
    
    cd genkit-basic
    npm install -g genkit @genkit-ai/tools-common
    genkit start --port 5000
    






