# Gunakan image Node.js sebagai dasar
FROM node:latest

# Buat direktori kerja di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada) ke dalam kontainer
COPY package*.json ./

# Pasang dependensi
RUN npm install

# Salin kode sumber aplikasi ke dalam kontainer
COPY . .

# Kompilasi TypeScript menjadi JavaScript (jika diperlukan)
RUN npm run build

# Run Aplication
CMD [ "npm", "start" ]
