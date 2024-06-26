#!/usr/bin/env bash


export API_PORT=3000
export UI_PORT=3001

# Start the API
pushd api || exit
# npm install
node index.js &
popd || exit

# Start the UI
pushd ui || exit
# npm install
npm run dev -- --host --port 3001 &
popd || exit
