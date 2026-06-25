$ErrorActionPreference = "Stop"

$pages = @(
  @{ slug = "academy"; url = "https://www.aiio.de/academy" },
  @{ slug = "click-demos"; url = "https://www.aiio.de/click-demos" },
  @{ slug = "success-stories"; url = "https://www.aiio.de/success-stories" },
  @{ slug = "product-news"; url = "https://www.aiio.de/platform/product-news" },
  @{ slug = "partner-finden"; url = "https://www.aiio.de/partner-finden" },
  @{ slug = "blog"; url = "https://www.aiio.de/blog" },
  @{ slug = "services"; url = "https://www.aiio.de/services" },
  @{ slug = "downloadcenter"; url = "https://www.aiio.de/downloadcenter" },
  @{ slug = "support"; url = "https://www.aiio.de/support" },
  @{ slug = "demo-kontakt"; url = "https://www.aiio.de/live-demo/kontakt" },
  @{ slug = "testen"; url = "https://www.aiio.de/kostenlose-testversion/anmelden" },
  @{ slug = "pricing"; url = "https://www.aiio.de/pricing" },
  @{ slug = "release-notes"; url = "https://www.aiio.de/release-notes" },
  @{ slug = "kontakt"; url = "https://www.aiio.de/kontakt" },
  @{ slug = "presse"; url = "https://www.aiio.de/presse" },
  @{ slug = "facts"; url = "https://www.aiio.de/facts" }
)

$assetRoot = Join-Path (Get-Location) "public\aiio-pages"
New-Item -ItemType Directory -Force -Path $assetRoot | Out-Null

function Resolve-AssetUrl {
  param(
    [string] $Value,
    [string] $BaseUrl
  )

  $clean = [System.Net.WebUtility]::HtmlDecode($Value.Trim())
  if ($clean.StartsWith("//")) {
    return "https:$clean"
  }
  if ($clean.StartsWith("http://") -or $clean.StartsWith("https://")) {
    return $clean
  }
  return ([Uri]::new([Uri]::new($BaseUrl), $clean)).AbsoluteUri
}

function Get-Extension {
  param([string] $Url)

  $path = ([Uri] $Url).AbsolutePath
  $ext = [System.IO.Path]::GetExtension($path)
  if ([string]::IsNullOrWhiteSpace($ext)) {
    return ".jpg"
  }
  return $ext.Split("?")[0].ToLowerInvariant()
}

$manifest = @()

foreach ($page in $pages) {
  Write-Host "Fetching $($page.url)"
  $response = Invoke-WebRequest -Uri $page.url -UseBasicParsing
  $html = $response.Content

  $pageDir = Join-Path $assetRoot $page.slug
  New-Item -ItemType Directory -Force -Path $pageDir | Out-Null

  $urls = [System.Collections.Generic.List[string]]::new()

  foreach ($match in [regex]::Matches($html, '(?is)(?:src|data-src)=["'']([^"'']+\.(?:png|jpe?g|webp|svg)(?:\?[^"'']*)?)["'']')) {
    $urls.Add((Resolve-AssetUrl $match.Groups[1].Value $page.url))
  }

  foreach ($match in [regex]::Matches($html, '(?is)srcset=["'']([^"'']+)["'']')) {
    $parts = $match.Groups[1].Value -split ","
    foreach ($part in $parts) {
      $candidate = ($part.Trim() -split "\s+")[0]
      if ($candidate -match '\.(png|jpe?g|webp|svg)(\?|$)') {
        $urls.Add((Resolve-AssetUrl $candidate $page.url))
      }
    }
  }

  foreach ($match in [regex]::Matches($html, '(?is)url\(["'']?([^"'')]+\.(?:png|jpe?g|webp|svg)(?:\?[^"'')]* )?)["'']?\)')) {
    $urls.Add((Resolve-AssetUrl $match.Groups[1].Value $page.url))
  }

  $uniqueUrls = $urls |
    Where-Object {
      $_ -match '\.(png|jpe?g|webp|svg)(\?|$)' -and
      $_ -notmatch 'facebook|instagram|youtube|x\.com'
    } |
    Select-Object -Unique |
    Select-Object -First 12

  $downloaded = @()
  $index = 1
  foreach ($url in $uniqueUrls) {
    $ext = Get-Extension $url
    $fileName = "image-{0:D2}{1}" -f $index, $ext
    $outPath = Join-Path $pageDir $fileName
    try {
      Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
      $downloaded += @{
        path = "/aiio-pages/$($page.slug)/$fileName"
        source = $url
      }
      $index++
    } catch {
      Write-Warning "Could not download $url"
    }
  }

  $manifest += @{
    slug = $page.slug
    source = $page.url
    assets = $downloaded
  }
}

$manifestPath = Join-Path $assetRoot "manifest.json"
$manifest | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 -Path $manifestPath
Write-Host "Wrote $manifestPath"
