$htmlFiles = Get-ChildItem -Path "e:\Frontend Developers\noshahi-test-bilder" -Filter "*.html"
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $updated = $content -replace 'img/NTB logo\.jpg\.jpeg', 'img/NTB_logo.png'
    if ($content -ne $updated) {
        Set-Content -Path $file.FullName -Value $updated -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "All done!"
