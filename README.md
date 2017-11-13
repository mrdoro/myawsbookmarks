# My AWS Bookmarks

Date: 2017-11-09

One place to store all bookmarks to AWS Accounts and Cross-Accounts Access Roles.


### Features

 - Keeping AWS account links in one place.

 - Keeping AWS Cross-Account Access Roles links in on place.

 - Fast Cross-Account access link generation.

 - All data are stored locally,

 - Fast Navigation to AWS account

 - No servers required, just install on AWS S3, Github Pages etc.


You can try/use on [console.lukado.eu](https://console.lukado.eu) or grab a copy and install where ever you want.


### Demo

[![Watch the video](http://img.youtube.com/vi/21TODybelJA/0.jpg)](https://www.youtube.com/embed/21TODybelJA)


### Instalation on S3:

1. Clone repo: ```git clone: https://github.com/mrdoro/myawsbookmarks.git ```
2. Create a S3 bucket: ```aws s3 mb s3://bucket_name --region preffered_region```
3. Configure S3 bucket as static website: ```aws s3 website s3://bucket_name --index-document index.html --error-document error.html```
4. Sync data to S3 (only necessary): ```aws s3 sync --acl public-read myawsbookmarks/ s3://bucket_name/ --exclude "*" --include "index.html" --include "assets/*"```
5. Get you website endpoint form S3 Console & Enjoy!


Author: Lukasz Dorosz [@mrdoro](https://twitter.com/mrdoro)




*Inspired by [Naveen Vijay](https://github.com/naveen-vijay/awsiamlogin) project*
