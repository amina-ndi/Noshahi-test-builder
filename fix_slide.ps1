$file = 'e:\Frontend Developers\noshahi-test-bilder\index.html'
$content = Get-Content $file -Raw

# Replace: slide 1 "item" -> "item active"
$content = $content -replace '(<!-- Slide 1 -->\r?\n\s*<div class="item")>', '$1 active">'

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Done!"
