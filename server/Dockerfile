FROM node:lts-alpine

WORKDIR /
COPY . .

RUN npm ci && npm install -g --save-dev @babel/core @babel/cli && \
    npx babel src --out-dir build

CMD ["/bin/sh", "./run.sh"]