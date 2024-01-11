/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const path = require('path')
 
// SCSS 를 사용하기 위한 옵션
module.exports = {
  
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

}