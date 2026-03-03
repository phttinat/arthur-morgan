# Test Windows TTS
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

Write-Host "Installed Voices:"
$synth.GetInstalledVoices() | ForEach-Object {
    Write-Host "  - $($_.VoiceInfo.Name)"
}

Write-Host ""
Write-Host "Testing speech..."
$synth.Speak("Hello! This is a test of Windows Text to Speech.")
Write-Host "Done!"
