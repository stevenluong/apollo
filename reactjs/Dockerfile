FROM node:latest
RUN mkdir /reactjs
WORKDIR /reactjs
RUN npm install -g serve
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build
CMD ["serve","-s","./build/.","-p","80"]
