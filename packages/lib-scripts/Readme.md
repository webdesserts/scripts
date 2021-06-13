# @webdesserts/lib-scripts

`lib-scripts` is a set of scripts that I use to build my js libraries. For right now it's a thin opinionated wrapper around `tsc` that caters to a my particular use-cases.

> **Warning**: this project is primarily for my personal use. Feel free to file issues, but I don't make any gaurantees that I'll get to them. Instead, I would encourage you to fork this repository and make your own personal set of scripts!

## Getting Started

To get up and running run the following

```bash
npm install --save-dev @webdesserts/lib-scripts
```
..._or_ if you're using `yarn`

```bash
yarn add --dev @webdesserts/lib-scripts
```

...and then add the following to your `package.json`

```json
"scripts": {
  "build": "lib-scripts build",
  "dev": "lib-scripts dev",
}
```

From here you'll want to ensure you've done the following:

- Add any `.ts` or `.js` to the `src/` folder.
- Add a `.tsconfig.json` with the following contents:
  ```json
  { "extends": "./node_modules/@webdesserts/lib-scripts/lib.tsconfig.json" }
  ```

As I use these scripts more and more, I may end up automating the above steps, but for now you'll have to do everything manually.

If you ever want to see a list of the available scripts you can run `yarn lib-scripts`.

## Roadmap
- Automatically generate missing files & folders.
- `lib-scripts test`
- `lib-scripts format`