$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$logDir = Join-Path $root "logs"

if (-not (Test-Path $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

$outLog = Join-Path $logDir "server.out.log"
$errLog = Join-Path $logDir "server.err.log"

$process = Start-Process -FilePath "node" `
  -ArgumentList "server.js" `
  -WorkingDirectory $root `
  -RedirectStandardOutput $outLog `
  -RedirectStandardError $errLog `
  -PassThru

Start-Sleep -Seconds 2

if ($process.HasExited) {
  Write-Error "Server exited early. Check logs/server.err.log"
  exit 1
}

Write-Output "Mystery Study Quest started on http://localhost:4173"
