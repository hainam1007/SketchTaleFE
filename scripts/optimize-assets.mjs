import sharp from 'sharp'
import { readFile, writeFile, readdir } from 'node:fs/promises'

// Format conversion only. Original generated artwork remains unchanged.
for (const name of ['hero', 'rabbit', 'seed', 'stars', 'logo']) {
  await sharp(`design/source/${name}.png`).resize({ width: name === 'logo' ? 480 : 960, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/images/${name}.webp`)
}
async function migrate(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`
    if (entry.isDirectory()) await migrate(path)
    else if (/\.(jsx|js)$/.test(path)) {
      const source = await readFile(path, 'utf8')
      await writeFile(path, source.replace(/\/images\/(hero|rabbit|seed|stars|logo)\.png/g, '/images/$1.webp'))
    }
  }
}
await migrate('src')
