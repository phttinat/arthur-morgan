# Install Rust on Windows
$tempPath = [System.IO.Path]::GetTempPath()
$rustupPath = Join-Path $tempPath 'rustup-init.exe'

Write-Host "Downloading Rust installer to: $rustupPath"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri 'https://win.rustup.rs/x86_64' -OutFile $rustupPath

Write-Host "Installing Rust (this may take a few minutes)..."
Start-Process -FilePath $rustupPath -ArgumentList '-y' -Wait -NoNewWindow

Write-Host "Done! Restart your terminal and run: rustc --version"
