Add-Type -AssemblyName System.Drawing
$imgPath = 'e:\Frontend Developers\noshahi-test-bilder\img\NTB_logo.png'
$img = [System.Drawing.Bitmap]::new($imgPath)

$colors = @{}

for ($x=0; $x -lt $img.Width; $x+=5) {
    for ($y=0; $y -lt $img.Height; $y+=5) {
        $c = $img.GetPixel($x, $y)
        # Ignore transparent
        if ($c.A -eq 0) { continue }
        # Ignore near white
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) { continue }
        # Ignore near black/gray
        if ([Math]::Abs($c.R - $c.G) -lt 15 -and [Math]::Abs($c.G - $c.B) -lt 15) { continue }
        
        $hex = "#{0:X2}{1:X2}{2:X2}" -f $c.R, $c.G, $c.B
        if ($colors.ContainsKey($hex)) {
            $colors[$hex]++
        } else {
            $colors[$hex] = 1
        }
    }
}

$colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10 | ForEach-Object {
    Write-Host "$($_.Name) - $($_.Value)"
}

$img.Dispose()
