$files = @("index.html", "login.html", "register.html", "book-demo.html", "insights.html")
$workDir = "e:\Frontend Developers\noshahi-test-bilder"

foreach ($file in $files) {
    $filePath = Join-Path -Path $workDir -ChildPath $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Replace Primary Brand Hex
        $content = $content -replace '(?i)#D94C58', '#6D28D9'
        $content = $content -replace '(?i)d94c58', '6d28d9'
        
        # Replace RGB representation
        $content = $content -replace '217, 76, 88', '109, 40, 217'
        
        # FAQ Gradient Fix
        $content = $content -replace '(?i)#ff8fa3', '#A78BFA'
        
        # Animated Stars color (from dark slate to Warm Amber #F59E0B)
        $content = $content -replace 'background-color: #0F172A;(\s*)border-radius: 50%;(\s*)animation: moveStar linear infinite;(\s*)box-shadow: 0 0 10px rgba\(15, 23, 42, 0\.2\);', "background-color: #F59E0B;`n            border-radius: 50%;`n            animation: moveStar linear infinite;`n            box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);"
        
        # Make all grey text slightly more professional (slate)
        $content = $content -replace 'text-gray-900', 'text-slate-900'
        $content = $content -replace 'text-gray-800', 'text-slate-800'
        $content = $content -replace 'text-gray-700', 'text-slate-700'
        $content = $content -replace 'text-gray-600', 'text-slate-600'
        $content = $content -replace 'text-gray-500', 'text-slate-500'
        $content = $content -replace 'text-gray-400', 'text-slate-400'
        $content = $content -replace 'text-gray-300', 'text-slate-300'
        
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        Write-Host "Processed $file"
    }
}
