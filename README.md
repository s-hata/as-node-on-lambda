Serverless Web Application
==========================

Deploy
------

```
$ aws cloudformation package \
             --template-file sam.yml \
             --s3-bucket showcase-template-store \
             --output-template-file packaged-sam.yml
```

```bash
aws cloudformation deploy \
             --template-file packaged-sam.yml \
             --stack-name todos \
             --capabilities CAPABILITY_IAM
```
