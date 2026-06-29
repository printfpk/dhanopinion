$word = New-Object -ComObject Word.Application
$word.Visible = $false
$docPath = 'c:\Users\prash\OneDrive\Desktop\Frontend projects\dhan003\dhanopinion\dhanopinion-react\public\Dhanopinion self serve steps.docx'
$doc = $word.Documents.Open($docPath)
$text = $doc.Content.Text
$doc.Close([ref]$false)
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
$text | Out-File -FilePath 'c:\Users\prash\OneDrive\Desktop\Frontend projects\dhan003\dhanopinion\dhanopinion-react\public\steps_extracted.txt' -Encoding UTF8
Write-Output "Done"
