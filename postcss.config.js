import tailwindcss from 'tailwindcss'
import nesting from 'tailwindcss/nesting/index.js'  // Correct the import here

export default {
  plugins: [
    nesting,
    tailwindcss,
    // other plugins if needed
  ]
}

