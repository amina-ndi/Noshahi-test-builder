$files = @("index.html", "login.html", "register.html", "book-demo.html", "insights.html")
$workDir = "e:\Frontend Developers\noshahi-test-bilder"

foreach ($file in $files) {
    $filePath = Join-Path -Path $workDir -ChildPath $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # HTML tag
        $content = $content -replace '<html lang="en" class="dark">', '<html lang="en" class="light">'
        
        # CSS Base
        $content = $content -replace 'background-color: #0A0A0A;', 'background-color: #F8FAFC;'
        $content = $content -replace 'color: #ffffff;', 'color: #0F172A;'
        $content = $content -replace 'color: white;', 'color: #0F172A;'
        
        # CSS Header & Nav
        $content = $content -replace 'background: rgba\(10, 10, 10, 0\.8\);', 'background: rgba(255, 255, 255, 0.8);'
        $content = $content -replace 'border-bottom: 1px solid rgba\(255, 255, 255, 0\.1\);', 'border-bottom: 1px solid rgba(15, 23, 42, 0.1);'
        $content = $content -replace '\.logo \{\s*display: flex;\s*align-items: center;\s*gap: 12px;\s*text-decoration: none;\s*font-weight: 800;\s*font-size: 20px;\s*color: #ffffff;\s*\}', '.logo { display: flex; align-items: center; gap: 12px; text-decoration: none; font-weight: 800; font-size: 20px; color: #0F172A; }'
        $content = $content -replace 'color: rgba\(255, 255, 255, 0\.7\)', 'color: rgba(15, 23, 42, 0.7)'
        $content = $content -replace 'color: white;(\s*)background: rgba\(255, 255, 255, 0\.05\);', 'color: #0F172A;$1background: rgba(15, 23, 42, 0.05);'

        # Dropdown
        $content = $content -replace 'background: rgba\(20, 20, 20, 0\.95\);', 'background: rgba(255, 255, 255, 0.95);'
        $content = $content -replace 'border: 1px solid rgba\(255, 255, 255, 0\.08\);', 'border: 1px solid rgba(15, 23, 42, 0.1);'
        
        # Pre-footer
        $content = $content -replace 'border-top: 1px solid rgba\(255, 255, 255, 0\.05\);', 'border-top: 1px solid rgba(15, 23, 42, 0.05);'
        
        # Footer
        $content = $content -replace 'footer \{\s*padding: 80px 0 40px;\s*background: #0A0A0A;', "footer {`n            padding: 80px 0 40px;`n            background: #FFFFFF;"
        $content = $content -replace 'border-top: 1px solid rgba\(255, 255, 255, 0\.08\);', 'border-top: 1px solid rgba(15, 23, 42, 0.08);'
        $content = $content -replace '\.footer-brand \.footer-logo \{\s*font-size: 24px;\s*font-weight: 800;\s*color: white;', ".footer-brand .footer-logo {`n            font-size: 24px;`n            font-weight: 800;`n            color: #0F172A;"
        $content = $content -replace 'color: rgba\(255, 255, 255, 0\.5\);', 'color: rgba(15, 23, 42, 0.6);'
        $content = $content -replace '\.footer-links h4 \{\s*color: white;', ".footer-links h4 {`n            color: #0F172A;"
        $content = $content -replace 'color: rgba\(255, 255, 255, 0\.6\);', 'color: rgba(15, 23, 42, 0.6);'
        $content = $content -replace 'background: rgba\(255, 255, 255, 0\.03\);', 'background: rgba(15, 23, 42, 0.03);'
        $content = $content -replace 'color: rgba\(255, 255, 255, 0\.4\);', 'color: rgba(15, 23, 42, 0.5);'

        # Stars specific
        $content = $content -replace 'background: #0A0A0A;(\s*)\}(\s*)\.moving-star \{', "background: #F8FAFC;`n        }`n        `n        .moving-star {"
        $content = $content -replace 'background-color: #ffffff;(\s*)border-radius: 50%;(\s*)animation: moveStar linear infinite;(\s*)box-shadow: 0 0 10px rgba\(255, 255, 255, 0\.8\);', "background-color: #0F172A;`n            border-radius: 50%;`n            animation: moveStar linear infinite;`n            box-shadow: 0 0 10px rgba(15, 23, 42, 0.2);"
        
        # Tailwind classes
        $content = $content -replace 'text-white/100', 'text-slate-900'
        $content = $content -replace 'text-white/90', 'text-slate-800'
        $content = $content -replace 'text-white/80', 'text-slate-700'
        $content = $content -replace 'text-white/70', 'text-slate-600'
        $content = $content -replace 'text-white/60', 'text-slate-500'
        $content = $content -replace 'text-white/50', 'text-slate-400'
        $content = $content -replace 'text-white', 'text-slate-900'
        
        $content = $content -replace 'border-white/10', 'border-slate-200'
        $content = $content -replace 'border-white/20', 'border-slate-300'
        $content = $content -replace 'border-white/30', 'border-slate-300'
        $content = $content -replace 'border-white/5', 'border-slate-100'
        
        $content = $content -replace 'bg-white/5', 'bg-white/80 shadow-md border-inherit border-slate-200'
        $content = $content -replace 'bg-white/10', 'bg-slate-100/50'
        $content = $content -replace 'bg-black/40', 'bg-white shadow-xl'
        $content = $content -replace 'bg-\[#0A0A0A\]', 'bg-slate-50'
        $content = $content -replace 'bg-black', 'bg-white'

        # Restore white text on primary buttons
        $content = $content -replace 'text-slate-900([^>]*bg-\[#D94C58\])', 'text-white$1'
        $content = $content -replace '(bg-\[#D94C58\][^>]*)text-slate-900', '$1text-white'
        $content = $content -replace 'text-slate-900([^>]*from-green-700)', 'text-white$1'
        $content = $content -replace '(from-green-700[^>]*)text-slate-900', '$1text-white'

        $content = $content -replace '\.btn-3d \{(\s*.*?\s*)color: #0F172A;', ".btn-3d {`$1color: #fff;"

        # Handle specific gradients and radial styling
        $content = $content -replace 'bg-\[radial-gradient\(125%_125%_at_50%_100%,transparent_0%,#0A0A0A_75%\)\]', 'bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,#F8FAFC_75%)]'
        $content = $content -replace 'background-color: rgb\(10, 10, 10\);', 'background-color: transparent;'
        
        $content = $content -replace 'from-\[#0A0A0A\]', 'from-slate-50'
        $content = $content -replace 'to-\[#0A0A0A\]', 'to-slate-100'
        $content = $content -replace 'rgba\(10, 10, 10, 0\.9\)', 'rgba(248, 250, 252, 0.9)'
        
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        Write-Host "Processed $file"
    }
}
