$files = Get-ChildItem -Path "e:\Frontend Developers\noshahi-test-bilder" -Recurse -Include *.html,*.css

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Text colors (headings, cards, etc) -> #262161
    $content = $content -replace '(?i)#0f172a', '#262161'
    
    # Replace all derived blue shades from previous step with the single #262161 code
    $content = $content -replace '(?i)#1a1642', '#262161'
    $content = $content -replace '(?i)#1f1b4e', '#262161'
    $content = $content -replace '(?i)#3c3499', '#262161'
    $content = $content -replace '(?i)#2d2774', '#262161'
    $content = $content -replace '(?i)#332c84', '#262161'
    $content = $content -replace '(?i)#2b256d', '#262161'

    # Any other dark slate/blue text colors like #1e293b and #334155 (just in case they are used in headings)
    $content = $content -replace '(?i)#1e293b', '#262161'
    $content = $content -replace '(?i)#334155', '#262161'

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Done enforcing single dark blue color."
