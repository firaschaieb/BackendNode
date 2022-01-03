FROM node:12

WORKDIR C:\Users\fir19\Desktop

COPY . .

RUN npm i

EXPOSE 8080

CMD ["npm","start"]