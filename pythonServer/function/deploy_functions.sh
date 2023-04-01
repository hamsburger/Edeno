gcloud functions deploy python-http-plant-recommendation-function \
--gen2 \
--runtime=python310 \
--region=us-east4 \
--source=. \
--entry-point=$1 \
--trigger-http \
--allow-unauthenticated