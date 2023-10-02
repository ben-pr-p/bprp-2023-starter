# bprp-2023-starter

Create a starter app from this template via:
```
bun create ben-pr-p/bprp-2023-starter
``` 

Next, you can create your front-end via:
```
cd packages/client
bun create vite my-app 
```

After following the instructions, you can then run the server via:
```
cd packages/server
bun dev
```

And run the client similarly in a new development tab, and you're all good to go!

Note that this starter assumed that your local development database is `postgres`. 
You likely want to be using a name that is unique to your project, so replace `/postgres`
with `/my_project` in `server/package.json` and `server/.env.development`.

# Motivation

See [my thoughts](https://bprp.xyz/stack) for why this exists

