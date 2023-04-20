. ps-scripts/env.ps1

$ecrUri = "$($AWS_ACCOUNT_ID).dkr.ecr.$($AWS_REGION).amazonaws.com/$($ECR_REPO)"

# Deploying ECR image with Zappa
Write-Output "Zappa Deploying: $($ecrUri):$($TAG)"
zappa deploy dev --docker-image-uri "$($ecrUri):$($TAG)"