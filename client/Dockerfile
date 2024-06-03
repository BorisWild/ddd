FROM node:lts-alpine

WORKDIR /
COPY . .

RUN npm install && npm install serve && \
    npm install react-scripts && npm run build
EXPOSE 3006

CMD ["npm" , "start"]