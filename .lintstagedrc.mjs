export default {
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `npm run lint --fix ${filenames.map((file) => `--file ${file}`).join(' ')}`
  ]
}
