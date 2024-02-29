- Para instalar o typescript, no terminal escreve npm i typrescript e depois instalar o @types/node com o npm @types/node e depois insstalar o @types/express.
- criar um arquivo de configuraçao pro typescript chamado de tsconfig.json
- escrever esse objeto json dentro do tsconfig : {
  "compilerOptions": {
  "target": "ES6",
  "module": "CommonJS",
  "outDir": "./dist", // Output directory for compiled JavaScript files
  "rootDir": "./src", // Source directory for TypeScript files
  "strict": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
  }
- cria um server.ts para instanciar o express e definir a porta
- para testar compilar o codigo usando o npx tsc e depois rodar com o node server.js
