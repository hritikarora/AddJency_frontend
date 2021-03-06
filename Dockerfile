#### Stage 1: Build the react application
FROM node:10.19.0-alpine 

# Configure the main working directory inside the docker image. 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Copy the package.json as well as the package-lock.json and install 
# the dependencies. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY package*.json ./

RUN npm install -g npm@6.14.4 -silent
# RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-scripts --silent 
# Copy the main application
COPY . ./

CMD ["npm","start"]
# Arguments
# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build the application
# RUN npm run build

#### Stage 2: Serve the React application from Nginx 
# FROM nginx:1.17.0-alpine

# Copy the react build from Stage 1
# COPY --from=build /app/build /var/www

# Copy our custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the Docker host, so we can access it 
# from the outside.
# EXPOSE 3000

# ENTRYPOINT ["nginx","-g","daemon off;"]
