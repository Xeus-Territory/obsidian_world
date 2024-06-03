---
title: How can protect React secrets?
tags:
  - developer
  - devops
  - helpful
  - cheatsheet
---
>[!quote]
>Hi @all, very new one from me about `React` content LOL 😄. Today, I will talk about the problems occur when i try to build container for `React` project and release application to Production, your environments secrets actually expose on bundle code 😱, so how the heck way to protect these ? Sorry if my knowledge about `React` does actually that mean or not. Let's try and digest !

# Problems

>[!bug]
>Ever you seen about your `3rd` party API key expose on your web browser, and yup it really exists and a lots.

You can use `devtools` to inspect and view `index-xxxx.js`, it can `bundle` file which compress all of module from `node` and your `src` into one file, and expose to client side

![[Pasted image 20240603153725.png]]

So It's not safe, yup it really not and this actually not recommendation when you want to put **anything secrets (such as Private API keys)** to `.env` variables, for example. You can read more at [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/), to understand why you shouldn't

But there is not way to can hidden that, and the answer is yes, *"You can't"*. But you can do a little trick when you want `.env` with contains some little secrets like `clientid` or `backendURL`. I will describe you about `vitejs` can help us doing that

# Solutions

The solutions which i prefer to you is about `vitejs`, the build tools with fascinating the performance for static file like `html`, `css` and `js`

With `react`, you can simply create react project with command

```bash
npm create vite@latest --template react-ts
```

After completely, you will have directory with structure

```bash
.
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── public
├── README.md
├── src
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

That for all, setup is already. Next you need to know about `.env` file and environments in `Vite` which can't make different. Read more at [VITE - Env Variables and Modes](https://vitejs.dev/guide/env-and-mode#env-variables-and-modes)

>[!info]
>Vite exposes env variables on the special `import.meta.env` object, which are statically replaced at build time.

>[!info]
>Loaded env variables are also exposed to your client source code via `import.meta.env` as strings.
>
>To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code. e.g. for the following env variables

For example, if you have

```bash
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

and when you try log to console, the `VITE` prefix variables will expose to **client side** but if not have prefix, your variables will not expose, it mean you can try use this trick to provide hidden way to load environment to your application, bundle it and no exposing anything

![[Pasted image 20240604143353.png]]

If you know you know, any language will exist `dotenv` library which help us provide and get variables from `.env` file into application, `React` with `Vitejs` can do same thing. You can install with command

```bash
npm i dotenv
```

The technologies of `dotenv` base on [The Twelve-Factor App](https://12factor.net/config) methodology. Storing configuration in the environment separate from code

When you have applied and installed `dotenv`, go to `vite.config.ts` and import some code to provide the way `vite` resolve the library

```js title="vite.config.js"
import { defineConfig, loadEnv } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react-swc'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'process.env' : process.env
    __ENV_SECRET__ : JSON.stringify(process.env.TEXT_NO_EXPOSE)
  }
})
```

With provide `TEXT_NO_EXPOSE` in your `.env` file

```bash title=".env"
TEXT_NO_EXPOSE="No bruh !!!"
```

After that you can reach to `src` directory to declare global variables which can help `react` app use the environment, create `globals.d.ts` file inside

```ts title="globals.d.ts"
declare const __ENV_SECRET__: string;
```

When you build application with `vite`, your source will bundle into `static` file include `html` `css` `js`, you can run these commands to perform build

```bash
npm i -g yarn

# Install package declare in package.json
yarn install

# Build your source code to static file
yarn build
```

![[Pasted image 20240604162440.png]]

And lastly, you can preview your application with `preview` mode of `vite`

```bash
yarn preview
```

Usually access `http://localhost:4173/` on browser 

![[Pasted image 20240604162808.png]]

That's default project of `vite` but reach to source code to inspect does expose anything or not, finding in the chunks `js` file with some context

- `__ENV_SECRET__`
- `TEXT_NO_EXPOSE`

![[Pasted image 20240604163054.png]]

![[Pasted image 20240604163112.png]]

With two context does exist in source code, reason because you don't use them in `app.tsx` but base on `theoretical` your `.env` is actually burn to your applications, and it reads this in runtime. What does it mean ? When you set `__ENV_SECRET__` in `app.tsx`, your secrets will mark inside

```ts title="app.tsx"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React {__ENV_SECRET__}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

Run `build` again, view on browser your secrets is actually exposing

![[Pasted image 20240604163626.png]]

But when you find context in source, it will not in the source code, just variables will map into

![[Pasted image 20240604163726.png]]

It's mean when you run it on `build`, it will get variables from `.env` file and map to bundle `js`, It likes `envsubst` in Linux command. Read more at: [Linux envsubst Command with Examples](https://www.baeldung.com/linux/envsubst-command)

>[!done]
>Therefore, with `vite` for specify and `react` for general, you will hard to put your `.env` to your source code when you want to `build` to **Production** application with bundle `js`. Solution in here, you need clarify `middleware` which stand in middle between your server host `frontend` and `client-side`, with exchange the data between them to retrieve the **sensitive variables**

# Another ways

But wait and let's try, `dotenv` support us one tool call `dotenv-vault`, here is [documentations](https://www.dotenv.org/docs/), with `vite`, I will follow up this [vite documentations](https://www.dotenv.org/docs/frameworks/vite/vercel)

Following the documentation, you need to install `dotenv-vault` or simply use it with `npx`, but first of all, you need to create the account by accessed [here](https://vault.dotenv.org/account/login). If you have account, go to create a new vault repository

```bash
# Create .env.vault
npx dotenv-vault new

# Login to .env.vault
npx dotenv-vault@latest login

# After login, you can use open to retrive the .env
npx dotenv-vault@latest open
```

![[Pasted image 20240604170535.png]]

Click **Add Button** to approve, you will have 2 option `push` and `pull`, but first push your `.env` to `dotenv`

```bash
npx dotenv-vault@latest push
```

Your actually file `.env.vault` with update on UI, you can sync with `build` command

```bash
npx dotenv-vault@latest build
```

`.env.vault` will sync with the version on the cloud, so you do not need to set `.env`, try get anything with only `vault` file (NOTE: you can push this file to repository, `AES256` 😮‍💨), just use command to get the key to decrypt `.env` base on your decision

![[Pasted image 20240605092403.png]]

Usually, It will exist 4 environments, but you can create `customize` to add your environments

To get the key, you can use command

```bash
npx dotenv-vault keys <environments>
```

Output can be

```bash
dotenv://:key_<hashstring>@dotenv.org/vault/.env.vault?environment=<environment>
```

Your prepare is also already, you can set keys output to shell variables, and use it for `build` and run `development` mode

With Linux

```bash
export DOTENV_KEY="dotenv://:key_<hashstring>@dotenv.org/vault/.env.vault?environment=<environment>"
```

With powershell

```powershell
$env:DOTENV_KEY = "dotenv://:key_<hashstring>@dotenv.org/vault/.env.vault?environment=<environment>"
```

Trigger `build` progress, and you will see the info to target your `.env.vault` to cloud `.env`

```bash {5}
~/Experimental/how-to-load-env on  main ⌚ 9:30:44
$ yarn build
yarn run v1.22.22
$ tsc && vite build
[dotenv@16.4.5][INFO] Loading env from encrypted .env.vault
vite v5.2.11 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.05 kB
dist/assets/index-DiwrgTda.css    1.39 kB │ gzip:  0.72 kB
dist/assets/index-DVoHNO1Y.js   143.36 kB │ gzip: 46.09 kB
✓ built in 584ms
Done in 1.62s.
```

Preview and take a look your variables will change and base on environments decision set on `DOTENV_KEY`, not anything secrets in your source code and bundle will not include your secrets but you need set `DOTENV_KEY` to decrypt

```bash
~/Experimental/how-to-load-env on  main! ⌚ 9:53:10
$ yarn preview
yarn run v1.22.22
$ vite preview
[dotenv@16.4.5][INFO] Loading env from encrypted .env.vault
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

![[Pasted image 20240605100800.png]]

Therefore, if you integrate `process.env` solutions, I think your secrets will wipe out or put somewhere not on application 😄😄😄

![[Pasted image 20240605100834.png]]

![[Pasted image 20240605100914.png]]

>[!done]
>Nothing easy, maybe I am wrong or not but put the `.env` and use `apikey` in Client side shouldn't recommend, It means you need to be created `middleware` or `backend` side to retrieve the `3rd` party applications

Source code to small demo: [react-bundle-secret](https://github.com/Xeus-Territory/react-bundle-secret)
# Conclusion

![[Pasted image 20240605100618.png]]

>[!note]
>That all for today, happy to comeback and learn something about `development` skills. But that need for my `devops` and understand why you need to recommend `dev` not to put anything `apikey` or `secretkey` on Client Side. Make sure you have `middleware` or put responsibility for `backend` to handling that job. Maybe i do trust the way or not know but that is best practice, that need to target 😅😅😅

>[!quote]
>Bring back the new things is my happiness and pleasure, so keep go in and learn to new thing, stay safe, wellness hacking and I will meet you on next topics. See yahh @all !!






