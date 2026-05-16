$files = Get-ChildItem -Path "e:\Frontend Developers\noshahi-test-bilder" -Recurse -Include *.html,*.css

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Primary (#020D27) -> #262161
    $content = $content -replace '(?i)#020D27', '#262161'
    $content = $content -replace '(?i)rgba\(\s*2\s*,\s*13\s*,\s*39\s*,', 'rgba(38, 33, 97,'
    $content = $content -replace '(?i)rgb\(\s*2\s*,\s*13\s*,\s*39\s*\)', 'rgb(38, 33, 97)'

    # Deep (#000511) -> #1a1642
    $content = $content -replace '(?i)#000511', '#1a1642'
    
    # Mid (#01081A) -> #1f1b4e
    $content = $content -replace '(?i)#01081A', '#1f1b4e'

    # Accent/Gradient light blue (#0a67bf) -> #3c3499
    $content = $content -replace '(?i)#0a67bf', '#3c3499'
    
    # Other gradient blues
    $content = $content -replace '(?i)#051a44', '#2d2774'
    $content = $content -replace '(?i)#061b44', '#2d2774'
    $content = $content -replace '(?i)#0a3161', '#332c84'
    $content = $content -replace '(?i)#041d4d', '#2b256d'
    $content = $content -replace '(?i)#00091D', '#1a1642'

    # rgba(0, 47, 109, ...) -> rgba(45, 39, 115, ...)
    $content = $content -replace '(?i)rgba\(\s*0\s*,\s*47\s*,\s*109\s*,', 'rgba(45, 39, 115,'

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Done!"
