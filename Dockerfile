FROM node:20-alpine

# set up working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json to current (/app) container folder
COPY package*.json .

# runs npm install inside the container
RUN npm install

# copy all of the code into the container
# this copy is separate from packages bc on next image rebuilds
# Docker builds the container from the files that have been changed
# since packages arent changed often, Docker caches the build info so it doesnt need to be run every rebuild
# could skip copy packages separately, but have to npm install on every build 
COPY . .


# expose port inside container to allow outside access
EXPOSE 3000

# command to run app
CMD ["npm", "run", "dev"]