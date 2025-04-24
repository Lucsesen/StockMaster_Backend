ECR_REGISTRY="018993003597.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 018993003597.dkr.ecr.us-east-1.amazonaws.com
docker build -t stockmaster/backend .
docker tag stockmaster/backend:latest $ECR_REGISTRY/stockmaster/backend:latest
docker push $ECR_REGISTRY/stockmaster/backend:latest
