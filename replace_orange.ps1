$files = Get-ChildItem -Path "e:\Frontend Developers\noshahi-test-bilder" -Include *.html, *.css, *.svg, *.js -Recurse
$pattern = '(?i)#(FFB800|FFD54F|FFCA28|f4A21A|E5A600|FFD24A|FFA726|FB8C00)'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match $pattern) {
        $newContent = [regex]::Replace($content, $pattern, '#F7941D')
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Color replacement complete."
