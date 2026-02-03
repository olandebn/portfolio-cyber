param(
  [string]$Input = "profile.jpg",
  [int]$Size = 800,
  [string]$OutJpg = "profile-optimized.jpg",
  [string]$OutWebP = "profile.webp"
)

function Has-Magick {
  return (Get-Command magick -ErrorAction SilentlyContinue) -ne $null
}

if (-not (Test-Path $Input)) {
  Write-Host "Fichier introuvable : $Input" -ForegroundColor Red
  Write-Host "Placez votre photo dans le dossier du projet et nommez-la exactly 'profile.jpg', puis relancez le script." -ForegroundColor Yellow
  exit 1
}

if (Has-Magick) {
  Write-Host "ImageMagick trouvé — optimisation en cours..." -ForegroundColor Green

  # Réécrire le JPG optimisé
  magick convert "$Input" -strip -resize ${Size}x${Size}^ -gravity center -extent ${Size}x${Size} -quality 85 "$OutJpg"

  # Générer WebP
  magick convert "$Input" -strip -resize ${Size}x${Size}^ -gravity center -extent ${Size}x${Size} -quality 80 "$OutWebP"

  Write-Host "Optimisation terminée : $OutJpg, $OutWebP" -ForegroundColor Green
} else {
  Write-Host "ImageMagick ('magick') introuvable sur ce système." -ForegroundColor Yellow
  Write-Host "Installez ImageMagick (https://imagemagick.org) puis relancez :" -ForegroundColor Yellow
  Write-Host "> .\scripts\optimize-image.ps1 -Input profile.jpg -Size 800" -ForegroundColor Cyan
  exit 2
}
