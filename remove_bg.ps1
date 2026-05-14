Add-Type -AssemblyName System.Drawing

$src = 'e:\Frontend Developers\noshahi-test-bilder\img\NTB logo.jpg.jpeg'
$dst = 'e:\Frontend Developers\noshahi-test-bilder\img\NTB_logo.png'

$img = [System.Drawing.Bitmap]::new($src)
$bmp = [System.Drawing.Bitmap]::new($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($img, 0, 0)
$g.Dispose()

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -gt 230 -and $p.G -gt 230 -and $p.B -gt 230) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()

Write-Host "Done! Transparent PNG saved to: $dst"
