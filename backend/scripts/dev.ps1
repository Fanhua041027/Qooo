$ErrorActionPreference = 'Stop'

if (-not (Test-Path '.env')) {
  Copy-Item '.env.example' '.env'
  Write-Host '已创建 backend/.env，请在启动真实 AI 前填写 SHENNONG_API_KEY。'
} else {
  Write-Host '已保留现有 backend/.env，不覆盖本地密钥和环境配置。'
}

docker compose up -d --wait
npm install
npm run prisma:generate
npm run db:deploy
npm run db:seed
npm run start:dev
