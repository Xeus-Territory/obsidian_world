---
title: work_with_s3
tags:
  - aws-s3
  - bash
  - linux
  - usage
  - devops
---
*This script will be helped you for retrieving the file from your S3 bucket*

```bash
#!/bin/bash

bucket="$1"
amzFile="$2"
outputFile="$3"
resource="/${bucket}/${amzFile}"
contentType="application/x-compressed-tar"
dateValue=$(date -R)
stringToSign="GET\n\n${contentType}\n${dateValue}\n${resource}"
AWS_ACCESS_KEY_ID="$4"
AWS_SECRET_ACCESS_KEY="$5"
signature=$(echo -en "${stringToSign}" | openssl sha1 -hmac ${AWS_SECRET_ACCESS_KEY} -binary | base64)

echo -n "$(curl  -H "Host: ${bucket}.s3.amazonaws.com" \
     -H "Date: ${dateValue}" \
     -H "Content-Type: ${contentType}" \
     -H "Authorization: AWS ${AWS_ACCESS_KEY_ID}:${signature}" \
     https://${bucket}.s3.amazonaws.com/${amzFile} -o "$outputFile")"
```

*This script will help you upload a new file into S3 bucket*

```bash
#!/bin/bash

file="FILEPATH"
bucket="BUCKET_NAME"
folder="FOLDER_IN_BUCKET"
resource="/${bucket}/${folder}/${file}"
contentType="text/plain"
dateValue=$(date -R)
s3Key="S3KEY"
s3Secret="S3SECRET"

# Check if the file exists on S3
httpResponseCode=$(curl -I -s -o /dev/null -w "%{http_code}" -X HEAD -H "Host: ${bucket}.s3.amazonaws.com" "https://${bucket}.s3.amazonaws.com/${folder}/${file}")

if [ $httpResponseCode -eq 200 ]; then
  # If the file exists, delete it
  deleteDateValue=$(date -R)
  deleteResource="/${bucket}/${folder}/${file}"
  deleteStringToSign="DELETE\n\n\n${deleteDateValue}\n${deleteResource}"
  deleteSignature=$(echo -en "${deleteStringToSign}" | openssl sha1 -hmac "${s3Secret}" -binary | base64)

  # Send the DELETE request
  curl -X DELETE -H "Host: ${bucket}.s3.amazonaws.com" -H "Date: ${deleteDateValue}" -H "Authorization: AWS ${s3Key}:${deleteSignature}" "https://${bucket}.s3.amazonaws.com/${folder}/${file}"
  echo ">>>>>>>>>>>>>>>>>>> An existing file was deleted successfully!"
fi

# Now, upload the new file
stringToSign="PUT\n\n${contentType}\n${dateValue}\n${resource}"
signature=$(echo -en "${stringToSign}" | openssl sha1 -hmac "${s3Secret}" -binary | base64)

# Send the PUT request to upload the new file
curl -L -X PUT -T "${file}" -H "Host: ${bucket}.s3.amazonaws.com" -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3Key}:${signature}" "https://${bucket}.s3.amazonaws.com/${folder}/${file}"
echo ">>>>>>>>>>>>>> A new file was uploaded successfully!"
```